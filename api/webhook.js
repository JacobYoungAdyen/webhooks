const db = require('../lib/db');
const Webhook = require('../models/Webhook');

module.exports = async (req, res) => {
  await db;
  if (req.method === 'POST') {
    try {
      const { live, notificationItems } = req.body;

      // Extract the NotificationRequestItem object
      const notificationRequestItem = notificationItems[0]?.NotificationRequestItem;

      console.log(notificationRequestItem)

      // Define the data to store, including both the main properties and the extracted item
      const webhookData = {
        live,
        notificationItem: notificationRequestItem,
      };

      // Save the structured data in MongoDB
      const webhook = new Webhook(webhookData);
      await webhook.save();

      res.status(200).json(["accepted"]);
    } catch (error) {
      console.error('Error storing webhook:', error);
      res.status(500).json({ error: 'Error storing webhook' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
