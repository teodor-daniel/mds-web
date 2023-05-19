const express = require('express');

// Controllers
const { dashboardView } = require('../controllers/dashboardController');

// Routes
const router = express.Router();

router.get('/dashboard', (req, res) => dashboardView(req, res));

module.exports = router;