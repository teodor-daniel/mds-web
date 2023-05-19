const express = require('express');

// Controllers
const { newCampaign, deleteCampaign, getAllCampaigns } = require('../controllers/campaignController');

// Routes
const router = express.Router();

router.get('/campaign/delete/:id', (req, res) => deleteCampaign(req, res));
router.post('/campaign', (req, res) => newCampaign(req, res));
router.post('/campaigns', (req, res) => getAllCampaigns(req, res));

module.exports = router;