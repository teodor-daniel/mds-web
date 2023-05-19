// Models
const CampaignModel = require('../models/Campaign');
const GameModel = require('../models/Game');

// Controllers
const dashboardView = async (req, res) => {
    if (req.session.user == null)
        return res.redirect('/login');

    const alert = req.session.alert;
    req.session.alert = null;

    const campaigns = await CampaignModel.find({}).lean();

    for (let campaign of campaigns) {
        const game = await GameModel.findOne({ _id: campaign.game_id });
        campaign.game_name = game.game_name;
    }

    res.render('dashboard', {user: req.session.user, campaigns, alert});
}

module.exports =  {
    dashboardView
};