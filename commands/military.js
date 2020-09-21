const Discord = require('discord.js')
const botconfig = require('../botconfig.json')
const Guild = require('../models/Guild')

module.exports.config = {
    name: 'military',
    aliases: ['war', 'mili', 'm']
}

module.exports.run = async (bot, message, args, color) => {

    const guild = await Guild.findOne({ guildId: message.guild.id })

    const embed = new Discord.MessageEmbed()
            .setColor(botconfig.color)
            .setTitle(`Guild Military Overview (${message.guild.name})`)
            .setDescription(`Click [here](http://example.com) to see the detailed production overview.`)
            .addFields(
                { name: 'Buildings', value: `\`\`\`ini\n• Barracks: [Level 5]\n• Walls: 3/5 [Level 8]\n• Checkpoints: 5 [Level 3]\`\`\``, inline: true },
                { name: 'Troops', value: `\`\`\`ini\n• Warriors: 4 Squads [Level 1]\n• Archers: 6 Squads [Level 4]\n• Battering Rams: 5 [Level 1]\n• Trebuchet: 1 [Level 5]\`\`\``, inline: false },
                { name: 'Total Guild Defense', value: `\`\`\`1,000\`\`\``, inline: true },
                { name: 'Wars Initiated', value: `\`\`\`ini\n0\`\`\``, inline: true },
                { name: '\u200B', value: '[Documentation](http://example.com) | [Leaderboard](http://example.com) | [Player Dashboard](http://example.com)', inline: false }
            )
            .setFooter(`RPeG ${botconfig.version}`, bot.user.avatarURL())

    return message.channel.send(embed)
}