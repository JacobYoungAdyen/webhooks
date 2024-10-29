// /lib/db.js
const mongoose = require('mongoose');

if (!global.mongoose) {
  global.mongoose = mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = global.mongoose;
