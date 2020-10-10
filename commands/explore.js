const Discord = require("discord.js")
const botconfig = require('../botconfig.json')
const Monster = require("../models/Monster")
const User = require("../models/User")

const forestMonsters = require("../resources/forest/monsters.json")
const forestLoot = require("../resources/forest/loot.json")

module.exports.config = {
    name: 'explore',
    aliases: ['ex', 'adventure']
}

module.exports.run = async (bot, message, args, color) => {

    const embed = new Discord.MessageEmbed()
        .setColor(botconfig.color)

    const random = Math.floor(Math.random() * 2) + 1
    const user = await User.findOne({ userId: message.author.id })

    console.log(random)

    if (random === 1) {

        var keys = Object.keys(forestMonsters)
        var ID = keys[Math.floor(keys.length * Math.random())]
        var monster = forestMonsters[ID]
        keys = Object.keys(monster.levels)
        var level = Math.floor(keys.length * Math.random())
        var m = monster.levels[keys[level]]
        level = level + 1

        await Monster.create({ target: message.author.id, loot: ID, health: m.defense, attack: m.attack, type: monster.type, level: level })
    
        embed.setTitle(`New Encounter! (${monster.type} ~ Level ${level})`)
        embed.setDescription(`${monster.message}\n`)
        embed.addFields(
            { name: `Options`, value: `\`\`\`ini\n⚔️ Attack!\n🛡️ Assume a defensive position\n🔮 Use a spell [requires MAGIC]\n💬 Speak\n🏃‍♂️ Attempt to flee\`\`\``, inline: false },
            { name: `${monster.type}\'s Health`, value: `\`\`\`${m.defense}\`\`\``, inline: true },
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
    } else if (random === 2) {

        var keys = Object.keys(forestLoot)
        var ID = keys[Math.floor(keys.length * Math.random())]
        var container = forestLoot[ID]
        keys = Object.keys(container.levels)
        var level = Math.floor(keys.length * Math.random())
        var c = container.levels[keys[level]]
        level = level + 1

        var num = Math.floor(Math.random() * 101)
        if (!user.items) {
            user.items = {}
        }
        var rewardMessage = ''
        var amount = 0

        console.log(`num in ${num}`)

        rewardMessage = ``
        for (var key in c.loot) {
            if (c.loot.hasOwnProperty(key)) {           
                console.log(key, c.loot[key]);
                if (num < c.loot[key].chance) {
                    amount = Math.floor(Math.random() * c.loot[key].amount[1]) + 1
                    if (user.items[key]) {
                        user.items[key].amount += amount
                    } else {
                        user.items[key] = {}
                        user.items[key].amount = amount
                    }
                    rewardMessage += `${key} x${amount}\n`
                }   
            }
        }

        if (rewardMessage === ``) {
            rewardMessage = `# Nothing`
        }
        embed.setTitle(`Container Found! (${c.rarity})`)
        embed.setDescription(`${container.message}`)
        embed.addFields(
            { name: `Loot Gained`, value: `\`\`\`ini\n${rewardMessage}\`\`\``, inline: true },
            { name: `Player`, value: `${message.author}`, inline: true }
        )

        await User.updateOne({ userId: message.author.id }, { items: user.items })

        message = await message.channel.send(embed)

        try { await message.delete({ timeout: 5000 }) } catch (e) {}
    }
}