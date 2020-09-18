const Discord = require('discord.js')
const Guild = require('../models/Guild')
const botconfig = require('../botconfig.json')

const embed = new Discord.MessageEmbed()
    .setColor(botconfig.color)

module.exports.config = {
    name: 'invite',
    aliases: ['invitebot', 'bot']
}

module.exports.run = async (bot, message, args, color) => {

    const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('Invite the bot!')
        .setDescription('Invite the bot to your server with the following link:\n https://discordapp.com/oauth2/authorize?client_id=738131258835468371&scope=bot&permissions=8')
        .setFooter('Invite message', bot.user.avatarURL())
        .setTimestamp()

    return message.channel.send(embed)
}