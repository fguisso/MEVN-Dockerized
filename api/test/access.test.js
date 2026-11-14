const test = require('node:test')
const assert = require('node:assert/strict')
const express = require('express')
const servicePath = require.resolve('../services/users.service')
let actor = null
require.cache[servicePath] = {
    id: servicePath, filename: servicePath, loaded: true,
    exports: { access: async () => actor }
}
const { canEditUser, requireAdmin } = require('../middleware/user-access')
const app = express()
app.use(express.json())
app.use((req, res, next) => { req.auth = { sub: req.headers['x-test-user'] }; next() })
app.put('/users/:_id', canEditUser, (req, res) => res.json({ ok: true }))
app.delete('/users/:_id', requireAdmin, (req, res) => res.json({ ok: true }))

const call = async (method, actorId, target, data) => {
    const server = app.listen(0, '127.0.0.1')
    await new Promise(resolve => server.once('listening', resolve))
    try {
        const response = await fetch(`http://127.0.0.1:${server.address().port}/users/${target}`, {
            method, headers: { 'content-type': 'application/json', 'x-test-user': actorId },
            body: method === 'PUT' ? JSON.stringify(data) : undefined
        })
        return response.status
    } finally { await new Promise(resolve => server.close(resolve)) }
}
const self = '507f1f77bcf86cd799439011'
const other = '507f1f77bcf86cd799439012'

test('normal user may edit own profile but not admin privilege', async () => {
    actor = { admin: false }
    assert.equal(await call('PUT', self, self, { name: 'New' }), 200)
    assert.equal(await call('PUT', self, self, { admin: true }), 403)
})

test('normal user may not edit or delete another user', async () => {
    actor = { admin: false }
    assert.equal(await call('PUT', self, other, { name: 'Attack' }), 403)
    assert.equal(await call('DELETE', self, other), 403)
})

test('admin may manage users, and deleted users lose access immediately', async () => {
    actor = { admin: true }
    assert.equal(await call('PUT', self, other, { admin: true }), 200)
    assert.equal(await call('DELETE', self, other), 200)
    actor = null
    assert.equal(await call('PUT', self, self, { name: 'Attack' }), 401)
})
