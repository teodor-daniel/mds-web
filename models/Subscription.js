const {mongoose, ObjectId} = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  expo_token: {
    type: String,
    required: true,
  },
  muted_stores: [{
    type: String,
  }],
  muted_categories: [{
    type: String,
  }],
  muted_last_minute: [{
    type: Boolean,
    required: true,
  }]
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);
module.exports = Subscription;
