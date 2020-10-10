const Discord = require('discord.js')
const botconfig = require('../botconfig.json')
const User = require('../models/User')

module.exports.config = {
    name: 'inventory',
    aliases: ['i', 'items', 'storage']
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

    var itemsDisplay = '\`\`\`ini\n'

    for (var key in user.items) {
        console.log(key)
        if (user.items.hasOwnProperty(key)) {           
            itemsDisplay += `• ${key} (${user.items[key].amount})\n`
        }
    }

    if (itemsDisplay === '\`\`\`ini\n') {
        itemsDisplay += '# No items to display!'
    }

    itemsDisplay += '\`\`\`'


    const embed = new Discord.MessageEmbed()
            .setColor(botconfig.color)
            .setTitle(`Inventory (${user.name} ~ Lvl ${user.level})`)
            .setDescription(`Click [here](http://example.com) to see the full inventory of this user.`)
            .addFields({ name: 'Items', value: `${itemsDisplay}`, inline: false })

    return message.channel.send(embed)
}