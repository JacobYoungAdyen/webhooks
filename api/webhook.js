const db = require('../lib/db');
const Webhook = require('../models/Webhook');

module.exports = async (req, res) => {
  await db;
  if (req.method === 'POST') {
    try {
      const { webhookType, data } = req.body;
      console.log("request body", req.body)
      console.log("full request", req)
      const webhook = new Webhook({ webhookType, data });
      await webhook.save();

      // Respond with a 200 status and JSON body of ["accepted"]
      res.status(200).json(["accepted"]);
    } catch (error) {
      res.status(500).json({ error: 'Error storing webhook' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

