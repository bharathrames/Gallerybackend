const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
});

module.exports = mongoose.model('Image', imageSchema);
