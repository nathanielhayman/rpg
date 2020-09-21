const Discord = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');
const { Server } = require('http');
const connectDB = require('./config/db')
const Guild = require('./models/Guild')
const botconfig = require('./botconfig.json');
const User = require('./models/User');

console.log('[^] Collecting assets...')

connectDB()

const bot = new Discord.Client({disableEveryone: true})

var timeout
var prefixes = {}

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return hours + ':' + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

async function dailyReport() {
    var date = new Date()
    var hour = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()

    console.log(`Refresh command ran at ${hour}:${minutes}:${seconds}`)

    if (hour === 1) {

        const embed = new Discord.MessageEmbed()
            .setColor(botconfig.color)
            .setTitle(`Daily Guild Update ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`)
            .setDescription(`**General Info** \n \`\`\`ini\n✓ Current Rank: [10th]\n✓ Net Worth: [$120,207]\n✓ Members: [102 members]\n\`\`\`
            **War Info** \`\`\`ini\nYour guild is not participating in any wars right now!\`\`\`
            **Important Info** \`\`\`ini\n✓ Made peace with 📌Surtido de Videojuegos!\n✗ The guild is currently [UNHAPPY]! More info in the guild overview.\`\`\`
            **Net Defense**\n \`\`\` ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░░░░░░░░░░░ (552/1000)\`\`\`
            [Documentation](http://example.com) | [Leaderboard](http://example.com) | [Guild Dashboard](http://example.com)`)
            .setFooter(`RPeG ${botconfig.version}`, bot.user.avatarURL())

        bot.guilds.cache.forEach(async guild => {
            guild.channels.cache.forEach(async channel => {
                if (channel.name.includes('rpg-updates')) {
                    await channel.send(embed)
                }
            })
        })
    }

    timeout = setTimeout(dailyReport, 3600000)
}

var users = []
var guilds = []

bot.on('ready', async () => {

    //await Guild.deleteMany()
    //await User.deleteMany()

    dailyReport()

    botGuilds = await Guild.find().lean()
    botUsers = await User.find().lean()

    botGuilds.forEach(guild => {
        guilds.push(guild.guildId)
        prefixes[guild.guildId] = guild.prefix
    })

    botUsers.forEach(user => {
        users.push(user.userId)
    })

    var guild_users = []

    bot.guilds.cache.forEach(async guild => {

        if (!guilds.includes(guild.id)) {

            var leader = JSON
            leader.id = guild.owner.id
            leader.name = guild.owner.user.username

            await Guild.create({ guildId: guild.id, prefix: '$', leader: leader })
            guilds.push(guild.id)
        }   

        guild.members.cache.forEach(async member => {

            if (!users.includes(member.id) && !guild_users.includes(member.id)) {
                await User.create({ userId: member.id })
                guild_users.push(toString(member.id))
            }
        })
    })

    bot.user.setActivity(`${guilds.length} Guilds`, { type: 'WATCHING' });

    console.log(`[^] Registered in ${guilds.length} servers`)

    console.log(`[^] Logged in as "${bot.user.username}"`)
    console.log(`[^] Now ready! 
`)
});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
    if(err) {console.log(`[^] Error reading client commands: ${err}`)} else console.log('[^] Connecting...')

    let jsfile = files.filter(f => f.split('.').pop() === 'js')
    if(jsfile.length <= 0) {
        console.log('[^] Couldn\'t find commands!')
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        })
    })
});

bot.on('guildCreate', async guild => {

    var leader = JSON

    leader.id = guild.owner.id
    leader.name = guild.owner.user.username

    await Guild.create({ guildId: guild.id, prefix: '$', leader: leader })
    guild.members.cache.forEach(async member => {
        if (!users.includes(member.id)) {
            await User.create({ userId: member.id })
        }
    })
    botGuilds = await Guild.find().lean()
    botUsers = await User.find().lean()
    bot.user.setActivity(`${botGuilds.length} Guilds`, { type: 'WATCHING' });
})

bot.on('guildDelete', async guild => {
    await Guild.deleteOne({ guildId: guild.id })
    botGuilds = await Guild.find().lean()
    bot.user.setActivity(`${botGuilds.length} Guilds`, { type: 'WATCHING' });
})

bot.on('message', async message => {

    if(message.author.bot || message.channel.type === 'dm') return;

    let prefix = prefixes[message.guild.id];
    let content = message.content.split(' ');
    let color = botconfig.color

    if(message.content.startsWith(prefix)) {

        let cmd = content[0];
        let args = content.slice(1);

        let cmdfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))

        if(cmdfile) {
            if (message.content.includes('prefix')) {
                prefixes[message.guild.id] = cmdfile.run(bot,message,args,color)
                console.log(prefixes)
            } else {
                cmdfile.run(bot,message,args,color)
            }
        }
    }

});

bot.login(botconfig.token);
