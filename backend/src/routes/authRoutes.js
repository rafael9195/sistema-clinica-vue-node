const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// Quando uma requisição POST chegar em /auth/register, chame a função register
router.post('/register', AuthController.register);

// Quando uma requisição POST chegar em /auth/login, chame a função login
router.post('/login', AuthController.login);

module.exports = router;