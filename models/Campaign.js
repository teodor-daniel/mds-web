const {mongoose, ObjectId} = require("mongoose");

const CampaignSchema = new mongoose.Schema({
  game_id: {
    type: ObjectId,
    required: true,
  },
  offer_store: {
    type: String,
    required: true,
  },
  offer_end_date: {
    type: Date,
    required: true,
  },
  offer_type: {
    type: String,
    required: true,
  },
  offer_link: {
    type: String,
    required: true,
  },
});

const Campaign = mongoose.model("Campaign", CampaignSchema);
module.exports = Campaign;
