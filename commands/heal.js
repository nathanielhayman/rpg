const Discord = require("discord.js")
const botconfig = require('../botconfig.json')
const locations = require('../resources/locations.json')

const User = require('../models/User')

async function arrive(location, user) {
    console.log(`Arrived at ${location}!`)
    await User.updateOne({ userId: user.userId }, { occupied: false, travel: JSON })
}

module.exports.config = {
    name: 'heal',
    aliases: []
}

module.exports.run = async (bot, message, args, color) => {

    const embed = new Discord.MessageEmbed()
        .setColor(botconfig.color)

    if (message.author.id === '485556939334484020') {
        await User.findOneAndUpdate({ userId: message.author.id }, { health: 100 })

        embed.setDescription('You feel strange power coursing through your veins... You have been healed!')
        await message.channel.send(embed)
    } else {
        embed.setDescription('You do not have permission to use that command!')
        await message.channel.send(embed)
    }
}