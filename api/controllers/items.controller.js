const express = require('express')
const itemService = require('../services/items.service')

const router = express.Router()

const list = (req, res) => {
    itemService.list()
        .then(items => res.status(200).json(items))
        .catch(() => res.status(400).type('text/plain').send('Invalid request.'))
}

const registerItem = (req, res) => {
    itemService.create(req.body)
        .then(msg => res.status(200).send(msg))
        .catch(() => res.status(400).type('text/plain').send('Invalid request.'))
}

const updateItem = (req, res) => {
    itemService.update(req.params._id, req.body)
        .then(msg => res.status(200).send(msg))
        .catch(() => res.status(400).type('text/plain').send('Invalid request.'))
}

const deleteItem = (req, res) => {
    itemService.delete(req.params._id)
        .then(msg => res.status(200).send(msg))
        .catch(() => res.status(400).type('text/plain').send('Invalid request.'))
}

router.get('/list', list)
router.post('/register', registerItem)
router.put('/:_id', updateItem)
router.delete('/:_id', deleteItem)

module.exports = router
