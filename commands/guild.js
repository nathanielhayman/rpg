const Discord = require('discord.js')
const botconfig = require('../botconfig.json')
const Guild = require('../models/Guild')

module.exports.config = {
    name: 'guild',
    aliases: ['g', 'guildstats', 'guildinfo', 'info']
}

module.exports.run = async (bot, message, args, color) => {

    const guild = await Guild.findOne({ guildId: message.guild.id })

    let guilds = []
    
    bot.guilds.cache.forEach(guild => {
        guilds.push(guild.id)
    })

    let members = []

    message.guild.members.cache.forEach(member => {
        if (!member.user.bot) {
            members.push(member.user.username)
        }
    })

    let medal = ''

    if (guilds.indexOf(message.guild.id) === 0) {
        medal = '🏆'
    }

    const embed = new Discord.MessageEmbed()
            .setColor(botconfig.color)
            .setTitle(`Guild Stats (${message.guild.name})`)
            .setDescription(`Click [here](http://example.com) to see the detailed guild overview.`)
            .addFields(
                { name: 'General Info', value: `\`\`\`ini\n✓ Current Rank: [${guilds.indexOf(message.guild.id) + 1}] ${medal}\n✓ Net Worth: [$0]\n✓ Members: [${message.guild.memberCount} members]\n\`\`\``, inline: true },
                { name: 'Top Members', value: `\`\`\`ini\n• ${members.slice(0, 3).join('\n• ')}\`\`\``, inline: true },
                { name: 'War Info', value: `\`\`\`ini\n# Your guild is not participating in any wars right now!\`\`\``, inline: false },
                { name: 'Important Info', value: `\`\`\`ini\n# No important info avalible \`\`\``, inline: false },
                { name: 'Net Defense', value: `\`\`\` ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ (1000/1000)\`\`\``, inline: true },
                { name: 'Leader', value: `\`\`\`ini\n${guild.leader.name}✔️\`\`\``, inline: true },
                { name: '\u200B', value: '[Documentation](http://example.com) | [Leaderboard](http://example.com) | [Player Dashboard](http://example.com)', inline: false }
            )
            .setFooter(`RPeG ${botconfig.version}`, bot.user.avatarURL())

    return message.channel.send(embed)
}