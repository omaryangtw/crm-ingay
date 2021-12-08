const express = require('express');

const router = express.Router();
const AuthenticationController = require('../controllers/AuthenticationController');

router.post('/', (req, res) => {
  AuthenticationController.login(req, res);
});

module.exports = router;
