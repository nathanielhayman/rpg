const Discord = require('discord.js');
const botconfig = require('../botconfig.json');
const fs = require('fs');
const Guild = require('../models/Guild')

module.exports.config = {
    name: 'setcolor',
    aliases: ['c', 'color', 'newcolor']
}

module.exports.run = async (bot, message, args, color) => {

    const embed = new Discord.MessageEmbed()
        .setColor(color)

    if(message.member.hasPermission('ADMINISTRATOR')) {

        embed.setDescription(`The bot\'s default color has been changed to \`${args[0]}\``)

        botconfig.color = args[0]

        try {
            await Guild.findOneAndUpdate({ guildId: message.guild.id }, {color: botconfig.color}, {
                new: true,
                runValidators: true,
              })
        } catch (e) {
            console.log('Guild does not have any data yet, updatating db.')
            await Guild.create({ guildId: message.guild.id, prefix: botconfig.color })
        }

        return message.channel.send(embed)
    } else {
        embed.setColor('#f54e42')
        embed.setDescription(`You do not have proper permissions!`)
        await message.channel.send(embed)
    }
}