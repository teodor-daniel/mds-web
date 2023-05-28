const express = require('express');

// Controllers
const { getGameById } = require('../controllers/gameController');

// Routes
const router = express.Router();

router.post('/game', (req, res) => getGameById(req, res));

module.exports = router;