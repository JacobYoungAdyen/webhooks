const db = require('../lib/db');
const Webhook = require('../models/Webhook');

module.exports = async (req, res) => {
  await db;
  try {
    const { type, data } = req.query;
    const query = {};
    if (type) query.webhookType = new RegExp(type, 'i');
    if (data) query.data = new RegExp(data, 'i');

    const webhooks = await Webhook.find(query);
    res.status(200).json(webhooks);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving webhooks' });
  }
};
