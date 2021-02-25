const express = require('express')
const userService = require('../services/users.service')

const router = express.Router()

const init = (req, res) => {
    const userParam = {
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin',
        admin: true }

    userService.create(userParam)
        .then(msg => res.status(200).send(msg))
        .catch(err => res.status(400).send(err))
}

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
        .catch(err => res.status(400).send(err))
}

const list = (req, res) => {
    userService.list()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).send(err))
}

const getById = (req, res) => {
    userService.getById(req.params._id)
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).send(err))
}

const registerUser = (req, res) => {
    userService.create(req.body)
        .then(msg => res.status(200).send(msg))
        .catch(err => res.status(400).send(err))
}

const updateUser = (req, res) => {
    userService.update(req.params._id, req.body)
        .then(msg => res.status(200).send(msg))
        .catch(err => res.status(400).send(err))
}

const deleteUser = (req, res) => {
    userService.delete(req.params._id)
        .then(msg => res.status(200).send(msg))
        .catch(err => res.status(400).send(err))
}

router.get('/init', init)
router.get('/list', list)
router.get('/:_id', getById)
router.post('/auth', authUser)
router.post('/register', registerUser)
router.put('/:_id', updateUser)
router.delete('/:_id', deleteUser)

module.exports = router
