const express = require('express');

// Controllers
const { newNotification, subscribe } = require('../controllers/notificationController');

// Routes
const router = express.Router();

router.post('/notification', (req, res) => newNotification(req, res));
router.post('/subscribe', (req, res) => subscribe(req, res));

module.exports = router;