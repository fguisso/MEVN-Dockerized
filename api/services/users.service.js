const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { users } = require('../models/db-connection')

const service = {}

const secret = process.env.SECRET

const auth = async (email, password) => {
    const user = await users.findOne({ email }, { created_at: 0, updated_at: 0 })

    if (!user) throw `E-mail ${email} not exist.`

    const match = await bcrypt.compare(password, user.hash)
    if (!match) throw 'Password incorrect!'

    return {
        token: jwt.sign({ sub: user._id }, secret),
        name: user.name,
        avatar: user.avatar,
        isAdmin: user.admin }
}

const list = async () => {
    const usersList = await users.find({}, { hash: 0, email: 0, avatar: 0 })
    return usersList || 'Nothing to show here!'
}

const getById = async (_id) => {
    const user = await users.findById(_id, { hash: 0, email: 0, avatar: 0 })
    return user || 'Nothing to show here!'
}

const countUsers = async () => {
    const count = await users.countDocuments({})
    return count || 'Nothing to show here!'
}

const create = async (userParam) => {
    const existing = await users.findOne({ email: userParam.email })
    if (existing) throw `E-mail ${userParam.email} is already taken.`

    const avatarRandom = () => {
        const ghIds = [342215, 5755568, 499550]
        const randNum = Math.floor((Math.random() * 3))
        return `https://avatars0.githubusercontent.com/u/${ghIds[randNum]}?v=3&s=32`
    }

    const newUser = new users({
        name: userParam.name,
        email: userParam.email,
        hash: bcrypt.hashSync(userParam.password, 10),
        admin: userParam.admin || false,
        avatar: avatarRandom(),
        created_at: new Date(),
        updated_at: new Date() })

    await newUser.save()
    return 'Successful user creation.'
}

const update = async (_id, userParam) => {
    userParam.updated_at = new Date()

    if (userParam.password) userParam.hash = bcrypt.hashSync(userParam.password, 10)

    await users.findByIdAndUpdate(_id, userParam)
    return 'User has been updated.'
}

const _delete = async (_id) => {
    await users.findByIdAndDelete(_id)
    return 'User has been deleted.'
}

service.auth = auth
service.list = list
service.count = countUsers
service.getById = getById
service.create = create
service.update = update
service.delete = _delete

module.exports = service
