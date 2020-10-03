const Discord = require('discord.js')
const Guild = require('../models/Guild')
const botconfig = require('../botconfig.json')

const embed = new Discord.MessageEmbed()
    .setColor(botconfig.color)

module.exports.config = {
    name: 'alliance',
    aliases: ['ally', 'newalliance']
}

module.exports.run = async (bot, message, args, color) => {
    
}