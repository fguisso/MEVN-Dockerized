const express = require('express')
const userService = require('../services/users.service')
const { canEditUser, requireAdmin } = require('../middleware/user-access')

const router = express.Router()

const authUser = (req, res) => {
    userService.auth(req.body.email, req.body.password)
        .then((obj) => {
            if (obj.token) {
                res.status(200).send({
                    token: obj.token,
                    name: obj.name,
                    avatarUrl: obj.avatar,
                    isAdmin: obj.isAdmin })
            } else res.status(401).send({
                err: "Incorrect user or password."
            })
        })
        .catch(() => res.status(400).type('text/plain').send('Invalid request.'))
}

const list = (req, res) => {
    userService.list()
        .then(users => res.status(200).json(users))
        .catch(() => res.status(400).type('text/plain').send('Invalid request.'))
}

const getById = (req, res) => {
    userService.getById(req.params._id)
        .then(users => res.status(200).json(users))
        .catch(() => res.status(400).type('text/plain').send('Invalid request.'))
}

const registerUser = (req, res) => {
    userService.create(req.body)
        .then(msg => res.status(200).send(msg))
        .catch(() => res.status(400).type('text/plain').send('Invalid request.'))
}

const updateUser = (req, res) => {
    userService.update(req.params._id, req.body)
        .then(msg => res.status(200).send(msg))
        .catch(() => res.status(400).type('text/plain').send('Invalid request.'))
}

const deleteUser = (req, res) => {
    userService.delete(req.params._id)
        .then(msg => res.status(200).send(msg))
        .catch(() => res.status(400).type('text/plain').send('Invalid request.'))
}

router.get('/list', list)
router.get('/:_id', getById)
router.post('/auth', authUser)
router.post('/register', registerUser)
router.put('/:_id', canEditUser, updateUser)
router.delete('/:_id', requireAdmin, deleteUser)

module.exports = router
