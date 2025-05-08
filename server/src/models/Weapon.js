const mongoose = require('mongoose');

const weaponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    default: 0
  },
  voters: {
    type: [String], // IP adresi veya userId
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Weapon', weaponSchema); 