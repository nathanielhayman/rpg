const Discord = require('discord.js')
const botconfig = require('../botconfig.json')
const User = require('../models/User')

module.exports.config = {
    name: 'stats',
    aliases: ['s', 'playerstats', 'playerinfo']
}

module.exports.run = async (bot, message, args, color) => {

    var user

    if (message.mentions && message.mentions.users.first()) {
        user = await User.findOne({ userId: message.mentions.users.first().id })
        user.name = message.mentions.users.first().username
    } else {
        user = await User.findOne({ userId: message.author.id })
        user.name = message.author.username
    }

    if (!user.equippedWeapon) {
        user.equippedWeapon = JSON
        user.equippedWeapon.name = 'No Weapon Equipped'
    }

    console.log(user.userId)
    console.log(user.skills)
    console.log(user.skills.strength)

    var names = []

    bot.guilds.cache.forEach(guild => {
        guild.members.cache.forEach(member => {
            if (member.id === message.author.id) {
                names.push(guild.name)
            }
        })
    })

    // ░░░░░░░░░░░░░░░░░░░░░░░░░

    formattedStrength = '▓'.repeat((user.skills.strength / 50) * 25) + '░'.repeat(25 - ((user.skills.strength / 50) * 25))
    formattedAgility = '▓'.repeat((user.skills.agility / 50) * 25) + '░'.repeat(25 - ((user.skills.agility / 50) * 25))
    formattedSpeech = '▓'.repeat((user.skills.speech / 50) * 25) + '░'.repeat(25 - ((user.skills.speech / 50) * 25))

    const embed = new Discord.MessageEmbed()
            .setColor(botconfig.color)
            .setTitle(`Traveler Info (${user.name} ~ Lvl ${user.level})`)
            .setDescription(`Click [here](http://example.com) to see a detailed profile of this user.`)
            .addFields(
                { name: 'General Info', value: `\`\`\`ini\n✓ Guild(s): [${names.join(', ')}]\n✓ Bank Balance: [$${user.balanceBank}]\n✓ Items Owned: [0]\`\`\``, inline: false },
                { name: 'Skills', value: `\`\`\`ini\n🦾 Strength: ${formattedStrength} (${user.skills.strength}/50)\n
👟 Agility: ${formattedAgility} (${user.skills.agility}/50)\n
🔊 Speech: ${formattedSpeech} (${user.skills.speech}/50)\n
🛠 Profession: ░░░░░░░░░░░░░░░░░░░░░░░░░ (0/50)\n
🔮 Magic: ░░░░░░░░░░░░░░░░░░░░░░░░░ (0/50)\n\`\`\``, inline: false },
                { name: 'Awards', value: `\`\`\`ini\n# There are no awards to display yet!\`\`\``, inline: true },
                { name: 'Allegiance', value: `\`\`\` ${message.guild.name}\`\`\``, inline: true },
                { name: 'Health', value: `\`\`\`${user.health} / 100\`\`\``, inline: true },
                { name: 'Weapon', value: `\`\`\`${user.equippedWeapon.name}\`\`\``, inline: true },
                { name: '\u200B', value: '[Documentation](http://example.com) | [Leaderboard](http://example.com) | [Player Dashboard](http://example.com)', inline: false }
            )
            .setFooter(`RPeG ${botconfig.version}`, bot.user.avatarURL())

    return message.channel.send(embed)
}