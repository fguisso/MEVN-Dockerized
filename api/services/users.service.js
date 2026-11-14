const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { users } = require('../models/db-connection')
const { string, objectId, fields } = require('./validation')

const service = {}

const secret = process.env.SECRET

const newPassword = value => {
    if (typeof value !== 'string' || value.length < 12) throw new TypeError('Password must be at least 12 characters.')
    return value
}

const auth = async (email, password) => {
    email = string(email, 'email')
    password = string(password, 'password')
    const user = await users.findOne({ email }, { created_at: 0, updated_at: 0 })

    if (!user) throw new Error('Invalid credentials.')

    const match = await bcrypt.compare(password, user.hash)
    if (!match) throw new Error('Invalid credentials.')

    return {
        token: jwt.sign({ sub: user._id }, secret, { expiresIn: '8h' }),
        name: user.name,
        avatar: user.avatar,
        isAdmin: user.admin }
}

const list = async () => {
    const usersList = await users.find({}, { hash: 0, email: 0, avatar: 0 })
    return usersList || 'Nothing to show here!'
}

const getById = async (_id) => {
    const user = await users.findById(objectId(_id), { hash: 0, email: 0, avatar: 0 })
    return user || 'Nothing to show here!'
}

const access = async (_id) => users.findById(objectId(_id), { admin: 1 })

const countUsers = async () => {
    const count = await users.countDocuments({})
    return count || 'Nothing to show here!'
}

const create = async (userParam) => {
    const { name, email, password } = fields(userParam, ['name', 'email', 'password'])
    string(name, 'name')
    string(email, 'email')
    newPassword(password)
    const existing = await users.findOne({ email })
    if (existing) throw new Error('E-mail is already taken.')

    const avatarRandom = () => {
        const ghIds = [342215, 5755568, 499550]
        const randNum = Math.floor((Math.random() * 3))
        return `https://avatars0.githubusercontent.com/u/${ghIds[randNum]}?v=3&s=32`
    }

    const newUser = new users({
        name,
        email,
        hash: bcrypt.hashSync(password, 10),
        admin: false,
        avatar: avatarRandom(),
        created_at: new Date(),
        updated_at: new Date() })

    await newUser.save()
    return 'Successful user creation.'
}

const bootstrapAdmin = async ({ email, password }) => {
    email = string(email, 'email')
    if (typeof password !== 'string' || password.length < 16) throw new TypeError('Admin password must be at least 16 characters.')
    if (await users.countDocuments({}) !== 0) throw new Error('Users already exist; bootstrap is disabled.')
    const now = new Date()
    await new users({
        name: 'Admin', email, hash: bcrypt.hashSync(password, 10), admin: true,
        avatar: 'https://avatars.githubusercontent.com/u/342215?v=3&s=32',
        created_at: now, updated_at: now
    }).save()
    return 'Admin created.'
}

const update = async (_id, userParam) => {
    const id = objectId(_id)
    const update = fields(userParam, ['name', 'email'])
    if (Object.hasOwn(userParam, 'admin')) {
        if (typeof userParam.admin !== 'boolean') throw new TypeError('Invalid admin.')
        update.admin = userParam.admin
    }
    if (Object.hasOwn(userParam, 'password')) update.hash = bcrypt.hashSync(newPassword(userParam.password), 10)
    update.updated_at = new Date()

    await users.findByIdAndUpdate(id, update)
    return 'User has been updated.'
}

const _delete = async (_id) => {
    await users.findByIdAndDelete(objectId(_id))
    return 'User has been deleted.'
}

service.auth = auth
service.list = list
service.count = countUsers
service.getById = getById
service.access = access
service.create = create
service.bootstrapAdmin = bootstrapAdmin
service.update = update
service.delete = _delete

module.exports = service
