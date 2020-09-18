const Discord = require('discord.js')
const botconfig = require('../botconfig.json');
const Guild = require('../models/Guild')

module.exports.config = {
    name: 'help',
    aliases: []
}

module.exports.run = async (bot, message, args, color) => {

    guild = await Guild.findOne({ guildId: message.guild.id })

    const embed = new Discord.MessageEmbed()
        .setColor(color)

    embed.setTitle(`${bot.user.username} Help`)
    embed.setDescription(`\`${guild.prefix}info\` ~ Shows info about the server.\n\`${guild.prefix}prefix <prefix>\` ~ Changes the bot's prefix.
    \`${guild.prefix}moderator <add/remove> <@user/@role>\` ~ Adds 
    or removes specified user / role as a moderator.\n\`${guild.prefix}gtn <#channel> <range>\` ~ Starts a guess the number event with specified range.
    \`${guild.prefix}counting <start/stop> <#channel>\` ~ Start / stop a counting event.`)
    embed.setFooter('Help message', bot.user.avatarURL())
    embed.setTimestamp()

    return message.channel.send(embed)
}