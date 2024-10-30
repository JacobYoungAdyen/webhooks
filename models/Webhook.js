// /models/Webhook.js
const mongoose = require('mongoose');

const webhookSchema = new mongoose.Schema({
  live: String,
  notificationItem: { type: Object }, // Stores the extracted NotificationRequestItem object
  receivedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Webhook || mongoose.model('Webhook', webhookSchema);
