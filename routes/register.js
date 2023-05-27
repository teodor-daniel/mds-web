const express = require('express');

// Controllers
const { registerView, doRegister } = require('../controllers/registerController');

// Routes
const router = express.Router();

router.get('/register', registerView);
router.post('/register', doRegister);

module.exports = router;
