const Discord = require("discord.js")
const botconfig = require('../botconfig.json')
const Monster = require("../models/Monster")
const User = require("../models/User")

module.exports.config = {
    name: 'explore',
    aliases: ['ex', 'adventure']
}

module.exports.run = async (bot, message, args, color) => {
    const embed = new Discord.MessageEmbed()
        .setColor(botconfig.color)

    await Monster.create({ target: message.author.id, loot: "forest-ent", health: 100, attack: 10, type: "Ent" })

    const user = await User.findOne({ userId: message.author.id })
    
    embed.setTitle(`New Encounter!`)
    embed.setDescription(`You turn a thick patch of trees and find a hulking tree ent standing across from you in a clearing. It does not seem agitated and does not attempt to attack you.\n`)
    embed.addFields(
        { name: `Options`, value: `\`\`\`ini\n⚔️ Attack\n🛡️ Assume a defensive position\n🔮 Use a spell [requires MAGIC]\n💬 Speak\n🏃‍♂️ Attempt to flee\`\`\``, inline: false },
        { name: `Ent\'s Health`, value: `\`\`\`100\`\`\``, inline: true },
        { name: `Your Health`, value: `\`\`\`${user.health}\`\`\``, inline: true },
    )

    if (!user.equippedWeapon) {
        embed.addFields(
            { name: `Your Weapon`, value: `\`\`\`No Weapon\`\`\``, inline: true },
            { name: `Player`, value: `${message.author}`, inline: true }
        )
    } else {
        embed.addFields(
            { name: `Your Weapon`, value: `\`\`\`${user.equippedWeapon.name}\`\`\``, inline: true },
            { name: `Player`, value: `${message.author}`, inline: true }
        )
    }

    let msg = await message.channel.send(embed)

    await msg.react('⚔️')
    await msg.react('🛡️')
    await msg.react('🔮')
    await msg.react('💬')
    await msg.react('🏃‍♂️')
}