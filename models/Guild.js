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
  }
})

module.exports = mongoose.model('Guild', GuildSchema)