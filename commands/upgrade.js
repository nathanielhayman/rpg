const Discord = require("discord.js")
const botconfig = require('../botconfig.json')
const locations = require('../resources/locations.json')

const User = require('../models/User')

async function arrive(location, user) {
    console.log(`Arrived at ${location}!`)
    await User.updateOne({ userId: user.userId }, { occupied: false, travel: JSON })
}

module.exports.config = {
    name: 'upgrade',
    aliases: ['spend']
}

module.exports.run = async (bot, message, args, color) => {

    const embed = new Discord.MessageEmbed()
        .setColor(botconfig.color)

    if (args[0]) {

        const user = await User.findOne({userId: message.author.id})

        if (args[0].toLowerCase() === 'strength') {
            user.skills.strength += 1
            await User.findOneAndUpdate({ userId: message.author.id }, { skills: user.skills, points: user.points - 1 })

            embed.setDescription('Leveled up your strength skill!')
        } else if (args[0].toLowerCase() === 'agility') {
            user.skills.agility += 1
            await User.findOneAndUpdate({ userId: message.author.id }, { skills: user.skills, points: user.points - 1 })

            embed.setDescription('Leveled up your agility skill!')
        } else if (args[0].toLowerCase() === 'speech') {
            user.skills.speech += 1
            await User.findOneAndUpdate({ userId: message.author.id }, { skills: user.skills, points: user.points - 1 })

            embed.setDescription('Leveled up your speech skill!')
        }
    }

    await message.channel.send(embed)
}