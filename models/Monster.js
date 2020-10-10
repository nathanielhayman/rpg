const mongoose = require('mongoose')

const MonsterSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  loot: {
    type: String,
    required: true
  },
  target: {
    type: String,
    required: false
  },
  health: {
    type: Number,
    required: true
  },
  attack: {
    type: Number,
    required: true
  },
  magic: {
    type: JSON,
    required: false
  },
  tags: {
    type: JSON,
    required: false,
    default: {resistance: 0, immune: false, affiliation: null}
  },
  level: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Monster', MonsterSchema)