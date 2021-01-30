/* eslint-disable no-unused-vars */
const express = require('express');
const { ProfileController } = require('../controllers/profile');
const { ValidationController } = require('../controllers/validation');

const router = express.Router();

router.get('/', (req, res, next) => ProfileController(req, res));

router.post('/validate-rule', async (req, res, next) => ValidationController(req, res))

module.exports = router;
