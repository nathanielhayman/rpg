const Discord = require('discord.js')
const botconfig = require('../botconfig.json')
const Guild = require('../models/Guild')

module.exports.config = {
    name: 'buildings',
    aliases: ['production', 'b', 'guildbuildings']
}

module.exports.run = async (bot, message, args, color) => {

    const guild = await Guild.findOne({ guildId: message.guild.id })

    const embed = new Discord.MessageEmbed()
            .setColor(botconfig.color)
            .setTitle(`Guild Production Overview (${message.guild.name})`)
            .setDescription(`Click **[here](http://example.com)** to see the detailed production overview.`)
            .addFields(
                { name: 'Farming Sector', value: `\`\`\`ini\n• Mills: 5 [Level 1]\n• Aqueduct System: [Level 2]\n• Farms: 20 [Level 3]\n• Mines: 4 [Level 2]\`\`\``, inline: true },
                { name: 'Marketplace Sector', value: `\`\`\`ini\n• General Shops: 20\n• Inns: 2\n• Churches: 2\`\`\``, inline: true },
                { name: 'Manufacturing Sector', value: `\`\`\`ini\n• Forges: 5 [Level 1]\n• Bakeries: 20 [Level 4]\n• Shipyard: [Level 1]\`\`\``, inline: false },
                { name: 'Professions', value: `\`\`\`ini\n• Lumberjacks: 4 [Level 1]\n• Farmers: 20 [Level 5]\n• Bakers: 5 [Level 2]\n• Craftsmen: 2 [Level 3]\n• Blacksmiths: 5 [Level 2]\n• Miners: 10 [Level 4]\`\`\``, inline: false },
                { name: 'Tax', value: `\`\`\`$2 / skilled laborer / day\`\`\``, inline: true },
                { name: 'Coffer Amount', value: `\`\`\`ini\n$1,204\`\`\``, inline: true },
                { name: '\u200B', value: '**[Documentation](http://example.com) | [Leaderboard](http://example.com) | [Player Dashboard](http://example.com)**', inline: false }
            )
            .setFooter(`RPeG ${botconfig.version}`, bot.user.avatarURL())

    return message.channel.send(embed)
}