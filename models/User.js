const { Int32 } = require('mongodb')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  level: {
      type: Number,
      required: false,
      default: 0
  },
  skills: {
    type: JSON,
    required: false,
    default: {strength: 0, agility: 0, speech: 0, profession: 0, magic: 0}
  },
  profession: {
    type: JSON,
    required: false
  },
  magic: {
    type: JSON,
    required: false
  },
  items: {
    type: JSON,
    required: false
  },
  balanceBank: {
    type: Number,
    required: false,
    default: 0
  },
  balancePerson: {
    type: Number,
    required: false,
    default: 0
  },
  atWar: {
    type: Boolean,
    required: false,
    default: false
  },
  war: {
    type: JSON,
    required: false,
  },
  occupied: {
    type: Boolean,
    required: false,
    default: false
  },
  acheivements: {
    type: JSON,
    required: false
  },
  alliance: {
    type: String,
    required: false
  },
  travel: {
    type: JSON,
    required: false
  }
})

module.exports = mongoose.model('User', UserSchema)