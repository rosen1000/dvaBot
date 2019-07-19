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
            let emoji = ":black_square_button:";
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
                        .addField("Commands", admin.map(cmd => `${emoji} ${cmd.name}: ${cmd.desc}`));
                    break;
                case 2:
                    embed = new Discord.RichEmbed()
                        .setTitle('📖 Help >> Anilist')
                        .setDescription("Anime image searches")
                        .addField("Commands", anilist.map(cmd => `${emoji} ${cmd.name}: ${cmd.desc}`));
                    break;
                case 3:
                    embed = new Discord.RichEmbed()
                        .setTitle('📖 Help >> Economy')
                        .setDescription("Economy related commands. For example coins or doritos")
                        .addField("Commands:", economy.map(cmd => `${emoji} ${cmd.name}: ${cmd.desc}`));
                    break;
                case 4:
                    embed = new Discord.RichEmbed()
                        .setTitle('📖 Help >> Fun')
                        .setDescription("I'll try my best to entertain you :)")
                        .addField("Commands:", fun.map(cmd => `${emoji} ${cmd.name}: ${cmd.desc}`));
                    break;
                case 5:
                    embed = new Discord.RichEmbed()
                        .setTitle('📖 Help >> Image')
                        .setDescription("I can search images too, not only you have acsess to google.. b-baka >~<")
                        .addField("Commands:", image.map(cmd => `${emoji} ${cmd.name}: ${cmd.desc}`));
                    break;
                case 6:
                    embed = new Discord.RichEmbed()
                        .setTitle('📖 Help >> Meta')
                        .setDescription("Commands closeley-related to the bot")
                        .addField("Commands:", meta.map(cmd => `${emoji} ${cmd.name}: ${cmd.desc}`));
                    break;
                case 7:
                    embed = new Discord.RichEmbed()
                        .setTitle('📖 Help >> Mod')
                        .setDescription("Some moderation commands regarding the server itself")
                        .addField("Commands:", mod.map(cmd => `${emoji} ${cmd.name}: ${cmd.desc}`));
                    break;
                case 8:
                    embed = new Discord.RichEmbed()
                        .setTitle('📖 Help >> Reaction')
                        .setDescription("Image-anime-reaction commands like one good swap to give someone some logic")
                        .addField("Commands:", reaction.map(cmd => `${emoji} ${cmd.name}: ${cmd.desc}`));
                    break;
                case 9:
                    embed = new Discord.RichEmbed()
                        .setTitle('📖 Help >> Shop')
                        .setDescription("Shop some cool items")
                        .addField("Commands:", shop.map(cmd => `${emoji} ${cmd.name}: ${cmd.desc}`));
                    break;
                case 10:
                    embed = new Discord.RichEmbed()
                        .setTitle('📖 Help >> Social')
                        .setDescription("For your special social needs")
                        .addField("Commands:", social.map(cmd => `${emoji} ${cmd.name}: ${cmd.desc}`));
                    break;
                case 11:
                    embed = new Discord.RichEmbed()
                        .setTitle('📖 Help >> Trading')
                        .setDescription("For trading items got from shop or other methods")
                        .addField("Commands:", trading.map(cmd => `${emoji} ${cmd.name}: ${cmd.desc}`));
                    break;
                case 12:
                    embed = new Discord.RichEmbed()
                        .setTitle('📖 Help >> Utility')
                        .setDescription("Some self commands")
                        .addField("Commands:", utility.map(cmd => `${emoji} ${cmd.name}: ${cmd.desc}`));
                    break;
                default:
                    return message.channel.send("Error while getting page, please contact dev via DM (Hax0r404#2104) or using ?bugreport command");
            }
            embed.setColor(botconfig.color);
            msg.edit(embed);
            reaction.remove(message.author);
            reset(coll, msg);
        });
    }
}

let timer;
let reset = function (collector, msg) {
    clearTimeout(timer);
    timer = setTimeout(() => {
        console.log(msg.embeds[0]);
        embed = new Discord.RichEmbed()
            .setTitle(msg.title)
            .addField(msg.fields[0].name, msg.fields[0].value)
            .setColor('black');
        msg.clearReactions();
        msg.edit(embed);
        collector.stop();
    }, 20000);
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
    type: "meta",
    desc: "helps you",
    use: "?help"
}