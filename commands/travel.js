const Discord = require("discord.js")
const botconfig = require('../botconfig.json')
const locations = require('../resources/locations.json')

const User = require('../models/User')

async function arrive(location, user) {
    console.log(`Arrived at ${location}!`)
    await User.updateOne({ userId: user.userId }, { occupied: false, travel: JSON })
}

module.exports.config = {
    name: 'travel',
    aliases: ['move', 'transport', 't']
}

module.exports.run = async (bot, message, args, color) => {

    const user = await User.findOne({ userId: message.author.id })

    const embed = new Discord.MessageEmbed()
        .setColor(botconfig.color)

    if (!args[0] && !user.occupied) {
        embed.setDescription(`Please specify a location to travel to! Availible locations are as follows:
        \n\`Forest (${botconfig.prefix}info forest)\`, \`City (${botconfig.prefix}info city)\``)
        await message.channel.send(embed)
    } else if (user.occupied && user.travel) {
        embed.setDescription(`You are currently traveling to \`${user.travel.travelingTo}\`. This will take another ${Number.parseFloat((user.travel.arrive - Date.now()) / 60000).toFixed(2)} minutes`)
        await message.channel.send(embed)
    } else {
        if (!user.occupied) {
            var time_req = locations["travel-time"][args[0]]
            setTimeout(async function() { arrive(args[0], user), await message.author.send(embed)}, time_req)
            await User.updateOne({ userId: user.userId }, { occupied: true, travel: {
                travelingTo: args[0], 
                started: Date.now(), 
                arrive: Date.now() + time_req} 
            })
            embed.setDescription(`You are now travelling to \`${args[0]}\`, which will take \`${Number.parseFloat(time_req / 60000).toFixed(2)}\`. Be ready to respond to pings, there are dangerous creatures around these parts!`)
            await message.channel.send(embed)
            embed.setDescription(`You have arrived at \`${args[0]}\`!`)
        }
    }
}