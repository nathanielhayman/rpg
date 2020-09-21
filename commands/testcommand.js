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

    embed.setTitle(`Welcome to the land of [INSERT NAME HERE]!`)
    embed.setDescription(`Welcome, young traveler, to the magical land of [Insert name here]! Here's how you can get started:`)
    embed.setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Bridge-medieval-fantasy-city.png/1200px-Bridge-medieval-fantasy-city.png')
    embed.setFooter(`RPeG ${botconfig.version}`, bot.user.avatarURL())
    embed.addFields(
        { name: 'Go on a quest', value: `\`\`\`ini\nYou can use the $quests command at any time\`\`\``, inline: false },
        { name: 'Explore your guild', value: `\`\`\`ini\nYou can use $explore to enter whatever location you're currently in\`\`\``, inline: false },
        { name: 'Get a crate', value: `\`\`\`ini\nVote for the bot and recieve a crate to help you on your travels! This crate can be claimed daily.\`\`\``, inline: false },
        { name: 'Create your own guild', value: `\`\`\`Inviting the bot to your guild will make you the leader of a mighty kingdom to-be!\`\`\``, inline: false },
        { name: '\u200B', value: '[Documentation](http://example.com) | [Leaderboard](http://example.com) | [Player Dashboard](http://example.com)', inline: false }
    )

    return message.channel.send(embed)
}