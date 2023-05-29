// Models
const CampaignModel = require("../models/Campaign");
const GameModel = require("../models/Game");

// Other controllers
const {newGame, getGameByName} = require('./gameController');

const newCampaign = async (req, res) => {
    if (req.session.user == null)
        return res.redirect('/login');

    const {gameName, offerStore, offerLink, offerType, offerEndDate} = req.body;

    let game = await getGameByName(gameName);

    if (game == null) {
        try {
            game = await newGame(gameName);
        }
        catch (e) {
            console.log(e);
        }
    }
    else
        game = game.id;

    const campaign = new CampaignModel({
        game_id: game,
        offer_store: offerStore,
        offer_end_date: offerEndDate,
        offer_type: offerType,
        offer_link: offerLink,
    });

    campaign.save(function (error, result) {
        if (error) {
            req.session.alert = {action: 'ADD_CAMPAIGN', errors: true, message: error};
            return res.redirect('/dashboard');
        }
        else {
            req.session.alert = {action: 'ADD_CAMPAIGN', errors: false, message: "Campaign added succesfully!"};
            return res.redirect('/dashboard');
        }
    });
}

const getAllCampaigns = async (req, res) => {
    const {orderByLatest, category, storeExceptions} = req.body;

    let campaigns = await CampaignModel.find({}).lean();

    campaigns = campaigns.filter((campaign) => campaign.offer_type == category && !storeExceptions.includes(campaign.offer_store));

    if (!orderByLatest)
        campaigns = campaigns.sort(function (a, b) {
            let firstDate = new Date(a.offer_end_date);
            let secondDate = new Date(b.offer_end_date);

            return firstDate - secondDate;
        });

    console.log(campaigns);

    res.status(200);
    return res.send(campaigns);
}

const deleteCampaign = (req, res) => {
    if (req.session.user == null)
        return res.redirect('/login');

    CampaignModel.deleteOne({ _id: req.params.id }, function (error, result) {
        if (error) {
            req.session.alert = {action: 'DELETE_CAMPAIGN', errors: true, message: error};
            return res.redirect('/dashboard');
        }
        else {
            req.session.alert = {action: 'DELETE_CAMPAIGN', errors: false, message: "Campaign deleted succesfully!"};
            return res.redirect('/dashboard');
        }
    });
}

module.exports =  {
    newCampaign,
    deleteCampaign,
    getAllCampaigns
};