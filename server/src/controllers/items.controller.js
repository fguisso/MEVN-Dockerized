import express from 'express';
import itemService from '../services/items.service';

const router = express.Router();

const list = (req, res) => {
  itemService.list()
    .then(items => res.status(200).json(items))
    .catch(err => res.status(400).send(err));
};

const registerItem = (req, res) => {
  itemService.create(req.body)
    .then(msg => res.status(200).send(msg))
    .catch(err => res.status(400).send(err));
};

const updateItem = (req, res) => {
  itemService.update(req.params._id, req.body)
    .then(msg => res.status(200).send(msg))
    .catch(err => res.status(400).send(err));
};

const deleteItem = (req, res) => {
  itemService.delete(req.params._id)
    .then(msg => res.status(200).send(msg))
    .catch(err => res.status(400).send(err));
};

router.get('/list', list);
router.post('/register', registerItem);
router.put('/:_id', updateItem);
router.delete('/:_id', deleteItem);

module.exports = router;
