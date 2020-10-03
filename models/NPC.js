const mongoose = require('mongoose')

const NPCSchema = new mongoose.Schema({
  profession: {
    type: String,
    required: true
  },
  hostile: {
    type: Boolean,
    required: false,
    default: false
  },
  location: {
    type: String,
    required: true
  },
  travel: {
    type: JSON,
    required: false
  },
  tradeTable: {
    type: JSON,
    required: false
  },
})

module.exports = mongoose.model('NPC', NPCSchema)