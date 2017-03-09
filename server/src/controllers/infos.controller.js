import express from 'express';
import infoService from '../services/infos.service';

const router = express.Router();

const giveMeInfo = (req, res) => {
  infoService.info()
    .then(msg => res.status(200).json(msg))
    .catch(err => res.status(400).send(err));
};

router.get('/', giveMeInfo);

module.exports = router;
