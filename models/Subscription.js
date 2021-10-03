const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
  endpoint: {
    type: String,
    unique: true
  },
  expirationTime: {},
  keys: {
    p256dh: String,
    auth: String
  },
  token: {
    type: String,
    unique: true
  }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);