const Discord = require("discord.js");
const botconfig = require("../botconfig");
const fs = require('fs');

module.exports.run = async (bot, message, args) => {
    if(args[0]){
    //     message.channel.send(`Command list:\nUse \`?help [command name]\` for more info\n\`\`\``
    // + `${bot.commands.map(c => `\n${c.help.name}`)}` + "\`\`\`");
    // }else{
        let command = args[0];
        if(bot.commands.has(command)){
            command = bot.commands.get(command);
            message.channel.send(`${command.help.name}'s help: \nDescription: ${command.help.desc} \nUsage: ${command.help.use}`)
        } else {
            message.channel.send('nothing found');
        }
    } else {
        let admin = find(bot, 'admin');
        let anilist = find(bot, 'anilist');
        let economy = find(bot, 'economy');
        let fun = find(bot, 'fun');
        let image = find(bot, 'image');
        let meta = find(bot, 'meta');
        let mod = find(bot, 'mod');
        let reaction = find(bot, 'reaction');
        let shop = find(bot, 'shop');
        let social = find(bot, 'social');
        let trading = find(bot, "trading");
        let utility = find(bot, "utility")

        let embed = new Discord.RichEmbed()
            .setTitle('📖 Help')
            .setColor(botconfig.color)
            .addField('Categories:',
                `Admin Commands (${admin.length})
                Anilist Commands (${anilist.length})
                Economy Commands (${economy.length})
                Fun Commands (${fun.length})
                Image Commands (${image.length})
                Meta Commands (${meta.length})
                Mod Commands (${mod.length})
                Reaction Commands (${reaction.length})
                Shop Commands (${shop.length})
                Social Commands (${social.length})
                Trading Commands (${trading.length})
                Utility Commands (${utility.length})`);
        let loadingEmbed = new Discord.RichEmbed()
            .setTitle('Loading help embed, please wait...')
            .setColor('yellow');
        let msg = await message.channel.send(loadingEmbed);
        await msg.react('⏮');
        await msg.react('◀');
        await msg.react('▶');
        await msg.react('⏭');
        await msg.react('🔢');
        msg.edit(embed);
        const pages = ['Main', 'Admin', 'Anilist', 'Economy', 'Fun', 'Image', 'Meta', 'Mod', 'Reaction', 'Shop', 'Social', 'Trading', 'Utility'];
        let index = 0;
        const emojis = ['⏮', '◀', '▶', '⏭', '🔢'];
        const filter = (r, u) => emojis.includes(r.emoji.name) && u.id == message.author.id;
        const collector = msg.createReactionCollector(filter);
        collector.on("collect", async (reaction, coll) => {
            if (reaction.emoji.name == emojis[0]) {
                index = 0;
            } else if (reaction.emoji.name == emojis[1]) {
                if (index > 0) index--;
            } else if (reaction.emoji.name == emojis[2]) {
                if (index < emojis.length - 1) index++;
            } else if (reaction.emoji.name == emojis[3]) {
                index = emojis.length - 1;
            } else {
                //select page
            }

            delete embed;
            embed = new Discord.RichEmbed()
                .setColor(botconfig.color);
            switch (index) {
                case 0:
                    embed = new Discord.RichEmbed()
                        .setTitle('📖 Help')
                        .addField('Categories:',
                            `Admin Commands (${admin.length})
                            Anilist Commands (${anilist.length})
                            Economy Commands (${economy.length})
                            Fun Commands (${fun.length})
                            Image Commands (${image.length})
                            Meta Commands (${meta.length})
                            Mod Commands (${mod.length})
                            Reaction Commands (${reaction.length})
                            Shop Commands (${shop.length})
                            Social Commands (${social.length})
                            Trading Commands (${trading.length})
                            Utility Commands (${utility.length})`);
                    break;
                case 1:
                    embed = new Discord.RichEmbed()
                        .setTitle('📖 Help >> Admin')
                        .setDescription("Server managment commands")
                        .addField("Commands", admin.map(cmd => `■ ${cmd}`));
                    break;
                case 2:
                    embed = new Discord.RichEmbed()
                        .setTitle('📖 Help >> Anilist')
                        .setDescription("Anime image searches")
                        .addField("Commands", anilist.map(cmd => `■ ${cmd}`));
            }
            if (index == 0) {
                embed = new Discord.RichEmbed()
                    .setColor(botconfig.color)
                    .addField("Pages", bot.commands.map(c => c.help.type));
            } else {
                embed = new Discord.RichEmbed()
                    .setColor(botconfig.color)
                    .setTitle(`${pages[index]} Category`)
                    .addField("Commands:", find(bot, pages[index].toLowerCase()).map(c => c));
            }
            msg.edit(embed);
            reaction.remove(message.author);
            reset(coll, msg);
        });
    }
}

let timer;
let create = function (index, pages) {
    let embed = new Discord.RichEmbed()
}
let reset = function (collector, msg) {
    console.log(msg)
    clearTimeout(timer);
    timer = setTimeout(() => {
        console.log(msg.embeds[0]);
        embed = new Discord.RichEmbed()
            .setTitle(msg.title)
            .addField(msg.name, msg.value)
            .setColor('black');
        msg.clearReactions();
        msg.edit(embed);
        collector.stop();
    }, 6000);
}
let find = function (bot, args) {
    let output = [];
    let commands = bot.commands.map(c => c);
    for (let i = 0; i < commands.length; i++) {
        if (commands[i].help.type == args) {
            output.push(commands[i].help);
        }
    }
    return output;
}

module.exports.help = {
    name: "help",
    desc: "helps you",
    use: "?help"
}