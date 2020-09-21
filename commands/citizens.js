const Discord = require('discord.js')
const botconfig = require('../botconfig.json')
const Guild = require('../models/Guild')

module.exports.config = {
    name: 'citizens',
    aliases: ['population', 'pop', 'people']
}

module.exports.run = async (bot, message, args, color) => {

    const guild = await Guild.findOne({ guildId: message.guild.id })

    const embed = new Discord.MessageEmbed()
            .setColor(botconfig.color)
            .setTitle(`Guild Population Overview (${message.guild.name})`)
            .setDescription(`Click [here](http://example.com) to see the detailed citizen overview.`)
            .addFields(
                { name: 'Net Happiness', value: `\`\`\`ini\n 🟢 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░ (364/500)\`\`\``, inline: false },
                { name: 'Starvation', value: `\`\`\`ini\n 🟢 ▓▓░░░░░░░░░░░░░░░░░░░░░░ (13/100)\`\`\``, inline: true },
                { name: 'Education', value: `\`\`\`ini\n 🟡 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░ (52/100)\`\`\``, inline: false },
                { name: 'Protection', value: `\`\`\`ini\n 🔴 ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░ (27/100)\`\`\``, inline: false },
                { name: 'Notes', value: `\`\`\`ini\nThis guild's protection level is very low! Citizens feel generally unsafe and will work less effectively as a result. This can be resolved by leveling up the guild's defenses.\`\`\``, inline: true },
                { name: '\u200B', value: '[Documentation](http://example.com) | [Leaderboard](http://example.com) | [Player Dashboard](http://example.com)', inline: false }
            )
            .setFooter(`RPeG ${botconfig.version}`, bot.user.avatarURL())

    return message.channel.send(embed)
}