const test = require('node:test')
const assert = require('node:assert/strict')
const dbPath = require.resolve('../models/db-connection')
const calls = []
let foundUser = null
let userCount = 0
class users {
    constructor(data) { this.data = data }
    async save() { calls.push(['userSave', this.data]) }
    static async findOne(...args) { calls.push(['findOne', ...args]); return foundUser }
    static async findByIdAndUpdate(...args) { calls.push(['userUpdate', ...args]) }
    static async findById(...args) { calls.push(['userGet', ...args]); return null }
    static async countDocuments() { return userCount }
}
class items {
    constructor(data) { this.data = data }
    async save() { calls.push(['itemSave', this.data]) }
    static async findByIdAndUpdate(...args) { calls.push(['itemUpdate', ...args]) }
}
require.cache[dbPath] = { id: dbPath, filename: dbPath, loaded: true, exports: { users, items } }
const userService = require('../services/users.service')
const itemService = require('../services/items.service')
const id = '507f1f77bcf86cd799439011'

test.beforeEach(() => { calls.length = 0; foundUser = null; userCount = 0 })

test('login rejects query objects without calling MongoDB', async () => {
    await assert.rejects(userService.auth({ $ne: null }, 'password'), /Invalid/)
    assert.equal(calls.length, 0)
})

test('registration rejects operator objects without calling MongoDB', async () => {
    await assert.rejects(userService.create({ name: 'A', email: { $ne: null }, password: 'long-password-123' }), /Invalid/)
    assert.equal(calls.length, 0)
})

test('IDs are canonical ObjectIds before MongoDB queries', async () => {
    await assert.rejects(userService.getById('constructor'), /Invalid/)
    await assert.rejects(itemService.update('invalid', { name: 'A' }), /Invalid/)
    assert.equal(calls.length, 0)
})

test('user update excludes operators and immutable fields, keeps editable fields', async () => {
    await userService.update(id, { name: 'Alice', admin: false, password: 'new-long-password-123', $set: { admin: true }, hash: 'attacker', created_at: '2000-01-01' })
    const [method, actualId, update] = calls[0]
    assert.equal(method, 'userUpdate')
    assert.equal(actualId.toHexString(), id)
    assert.equal(update.name, 'Alice')
    assert.equal(update.admin, false)
    assert.notEqual(update.hash, 'attacker')
    assert.match(update.hash, /^\$2/)
    assert.equal(update.created_at, undefined)
    assert.equal(update.$set, undefined)
    assert.equal(update.password, undefined)
})

test('item update excludes operators and immutable fields', async () => {
    await itemService.update(id, { name: 'Rice', status: 'Done', solicitante: 'Admin', $set: { status: 'evil' }, created_at: '2000-01-01' })
    const [method, actualId, update] = calls[0]
    assert.equal(method, 'itemUpdate')
    assert.equal(actualId.toHexString(), id)
    assert.deepEqual([update.name, update.status, update.solicitante], ['Rice', 'Done', 'Admin'])
    assert.equal(update.created_at, undefined)
    assert.equal(update.$set, undefined)
})

test('normal registration and item creation retain response and persisted fields', async () => {
    assert.equal(await userService.create({ name: 'Alice', email: 'alice@example.com', password: 'long-password-123' }), 'Successful user creation.')
    assert.equal(calls[1][0], 'userSave')
    assert.equal(calls[1][1].email, 'alice@example.com')
    assert.match(calls[1][1].hash, /^\$2/)
    assert.equal(await itemService.create({ name: 'Rice', solicitante: 'Alice', status: 'Pending' }), 'Successful item creation.')
    assert.equal(calls[2][0], 'itemSave')
    assert.equal(calls[2][1].status, 'Pending')
})

test('public registration cannot set admin even with admin true', async () => {
    await userService.create({ name: 'Attacker', email: 'attacker@example.com', password: 'long-password-123', admin: true })
    assert.equal(calls[1][1].admin, false)
})

test('offline admin bootstrap requires strong secret and empty database', async () => {
    await assert.rejects(userService.bootstrapAdmin({ email: 'owner@example.com', password: 'short' }), /password/i)
    assert.equal(calls.length, 0)
    userCount = 1
    await assert.rejects(userService.bootstrapAdmin({ email: 'owner@example.com', password: 'very-long-password-123' }), /already/i)
    assert.equal(calls.length, 0)
    userCount = 0
    await userService.bootstrapAdmin({ email: 'owner@example.com', password: 'very-long-password-123' })
    assert.equal(calls[0][0], 'userSave')
    assert.equal(calls[0][1].admin, true)
    assert.equal(calls[0][1].email, 'owner@example.com')
    assert.notEqual(calls[0][1].hash, 'very-long-password-123')
})

test('new user passwords must be at least 12 characters', async () => {
    await assert.rejects(userService.create({ name: 'A', email: 'a@example.test', password: 'short' }), /password/i)
    await assert.rejects(userService.update(id, { password: 'short' }), /password/i)
    assert.equal(calls.length, 0)
})

test('normal login still returns JWT and profile', async () => {
    process.env.SECRET = 'test-only-secret'
    // The module captures SECRET at import, so reload it with the test secret.
    delete require.cache[require.resolve('../services/users.service')]
    const loginService = require('../services/users.service')
    const bcrypt = require('bcryptjs')
    foundUser = { _id: id, name: 'Alice', hash: bcrypt.hashSync('pass', 4), avatar: 'avatar', admin: false }
    const result = await loginService.auth('alice@example.com', 'pass')
    assert.equal(result.name, 'Alice')
    assert.equal(result.isAdmin, false)
    assert.equal(require('jsonwebtoken').verify(result.token, process.env.SECRET).sub, id)
    assert.ok(require('jsonwebtoken').decode(result.token).exp, 'JWT must expire')
})
