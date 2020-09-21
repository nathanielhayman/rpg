const mongoose = require('mongoose')

const GuildSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    required: true,
  },
  atWar: {
    type: Boolean,
    required: false
  },
  war: {
    type: JSON,
    required: false
  },
  leader: {
    type: JSON,
    required: true
  },
  buildings: {
    type: JSON,
    required: false
  },
  professions: {
    type: JSON,
    required: false
  }
})

module.exports = mongoose.model('Guild', GuildSchema)