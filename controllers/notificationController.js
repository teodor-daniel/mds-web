const { Expo } = require('expo-server-sdk');

// Models
const SubscriptionModel = require("../models/Subscription");

// Controllers
const newNotification = async (req, res) => {
    const {message} = req.body;

    let expo = new Expo();

    const subscriptions = await SubscriptionModel.find({});

    let messages = [];
    for (let subscription of subscriptions) {
      if (!Expo.isExpoPushToken(subscription.expo_token))
        continue;
    
      messages.push({
        to: subscription.expo_token,
        sound: 'default',
        body: message,
      })
    }
    
    let chunks = expo.chunkPushNotifications(messages);
    (async () => {
      for (let chunk of chunks) {
        try {
          await expo.sendPushNotificationsAsync(chunk);
        } catch (error) {
          console.error(error);
        }
      }
    })();

    res.redirect('/dashboard');
}

const subscribe = async (req, res) => {
    const {expo_token, muted_stores, muted_categories, muted_last_minute} = req.body;

    const results = await SubscriptionModel.find({ expo_token });

    if (results.length == 0) {
        let subscription = new SubscriptionModel({ expo_token, muted_stores, muted_categories, muted_last_minute });

        await subscription.save();
    }

    res.sendStatus(200);
}

module.exports =  {
    newNotification,
    subscribe,
};