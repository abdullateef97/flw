/* eslint-disable no-unused-vars */
const express = require('express');
const { ValidationController } = require('../controllers/validation');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send({ message: 'Hello world' });
});

router.post('/validate-rule', async (req, res, next) => ValidationController(req, res))

module.exports = router;
