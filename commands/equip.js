const Discord = require('discord.js')
const Guild = require('../models/Guild')
const botconfig = require('../botconfig.json')

const User = require('../models/User')

const embed = new Discord.MessageEmbed()
    .setColor(botconfig.color)

module.exports.config = {
    name: 'equip',
    aliases: ['eq', 'attach']
}

module.exports.run = async (bot, message, args, color) => {
    await User.findOneAndUpdate({ userId: message.author.id }, { equippedWeapon: {name: 'Rusty Blade', id: 'rustyblade', damage: 10} })

    embed.setDescription('You have equipped your `Rusty Blade`!')
    await message.channel.send(embed)
}