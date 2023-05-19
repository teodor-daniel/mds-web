const express = require('express');

// Controllers
const { loginView, doLogin } = require('../controllers/loginController');

// Routes
const router = express.Router();

router.get('/login', loginView);
router.post('/login', (req, res) => doLogin(req, res));

module.exports = router;