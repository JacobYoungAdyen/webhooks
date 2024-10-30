// /models/Webhook.js
const mongoose = require('mongoose');

const webhookSchema = new mongoose.Schema({
  webhookType: String,
  data: { type: Object },
  receivedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Webhook || mongoose.model('Webhook', webhookSchema);
