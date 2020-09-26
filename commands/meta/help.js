const Discord = require("discord.js");
const botconfig = require("../botconfig");
const fs = require("fs");

/**
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (bot, message, args) => {
    if (args[0]) {
        let embed = new Discord.MessageEmbed();
        let command = args[0];
        if (bot.commands.has(command)) {
            command = bot.commands.get(command);
            embed.setTitle(`${command.help.name}'s help`);
            embed.addField("Description:", command.help.desc);
            embed.addField("Usage:", command.help.use);
            embed.addField("Category:", command.help.type);
            embed.setColor(botconfig.color);
        } else {
            embed.setTitle("Nothing found :(");
            embed.setColor("RED");
        }
        message.channel.send(embed);
    } else {
        let admin = find(bot, "admin");
        let anilist = find(bot, "anilist");
        let economy = find(bot, "economy");
        let fun = find(bot, "fun");
        let image = find(bot, "image");
        let meta = find(bot, "meta");
        let mod = find(bot, "mod");
        let reaction = find(bot, "reaction");
        let shop = find(bot, "shop");
        let social = find(bot, "social");
        let trading = find(bot, "trading");
        let utility = find(bot, "utility");

        let embed = new Discord.MessageEmbed()
            .setTitle("📖 Help")
            .setColor(botconfig.color)
            .addField(
                "Categories:",
                `1: Admin Commands (${admin.length})
                2: Anilist Commands (${anilist.length})
                3: Economy Commands (${economy.length})
                4: Fun Commands (${fun.length})
                5: Image Commands (${image.length})
                6: Meta Commands (${meta.length})
                7: Mod Commands (${mod.length})
                8: Reaction Commands (${reaction.length})
                9: Shop Commands (${shop.length})
                10: Social Commands (${social.length})
                11: Trading Commands (${trading.length})
                12: Utility Commands (${utility.length})`
            );
        let loadingEmbed = new Discord.MessageEmbed()
            .setTitle("Loading help embed, please wait...")
            .setColor("ffff00");
        let msg = await message.channel.send(loadingEmbed);
        await msg.react("⏮");
        await msg.react("◀");
        await msg.react("▶");
        await msg.react("⏭");
        await msg.react("🔢");
        let index = 0;
        const emojis = ["⏮", "◀", "▶", "⏭", "🔢"];
        const filter = (r, u) =>
            emojis.includes(r.emoji.name) && u.id == message.author.id;
        const collector = msg.createReactionCollector(filter);
        msg.edit(embed).then(reset(collector, msg));
        collector.on("collect", async (reactions, coll) => {
            if (coll.id != message.author.id) return;
            if (reactions.emoji.name == emojis[0]) {
                index = 0;
            } else if (reactions.emoji.name == emojis[1]) {
                if (index > 0) index--;
            } else if (reactions.emoji.name == emojis[2]) {
                if (index < emojis.length - 1) index++;
            } else if (reactions.emoji.name == emojis[3]) {
                index = 12;
            } else if (reactions.emoji.name == emojis[4]) {
                let awaitMessage = await message.channel.send("Select page from 0 to 12");
                const filter = (m) => m.author.id == message.author.id;
                await message.channel
                    .awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ["time"],
                    })
                    .then((collected) => {
                        let number = parseInt(collected.first().content);
                        if (number == NaN)
                            return message.channel
                                .send("That's not a number")
                                .then((msg) => {
                                    collected.first().delete(3000);
                                    awaitMessage.delete(3000);
                                });
                        if (number > 12)
                            return message.channel
                                .send("Page can't be more than the maximum (12)")
                                .then((msg) => {
                                    collected.first().delete(3000);
                                    awaitMessage.delete(3000);
                                });
                        if (number < 0)
                            return message.channel
                                .send(
                                    "Page can't be less than the minimum (0 for main page)"
                                )
                                .then((msg) => {
                                    collected.first().delete(3000);
                                    awaitMessage.delete(3000);
                                });
                        index = number;
                        message.channel.send("Done!").then((m) => {
                            m.delete(3000);
                            collected.first().delete(3000);
                            awaitMessage.delete(3000);
                        });
                    })
                    .catch((collected) => {
                        message.channel.send("Time ran out!").then((m) => {
                            m.delete(3000);
                            awaitMessage.delete();
                        });
                    });
            }
            delete embed;
            switch (index) {
                case 0:
                    embed = new Discord.MessageEmbed().setTitle("📖 Help").addField(
                        "Categories:",
                        `1: Admin Commands (${admin.length})
                            2: Anilist Commands (${anilist.length})
                            3: Economy Commands (${economy.length})
                            4: Fun Commands (${fun.length})
                            5: Image Commands (${image.length})
                            6: Meta Commands (${meta.length})
                            7: Mod Commands (${mod.length})
                            8: Reaction Commands (${reaction.length})
                            9: Shop Commands (${shop.length})
                            10: Social Commands (${social.length})
                            11: Trading Commands (${trading.length})
                            12: Utility Commands (${utility.length})`
                    );
                    break;
                case 1:
                    embed = new Discord.MessageEmbed()
                        .setTitle("📖 Help >> Admin")
                        .setDescription("Server managment commands")
                        .addField("Commands", map(bot, admin));
                    break;
                case 2:
                    embed = new Discord.MessageEmbed()
                        .setTitle("📖 Help >> Anilist")
                        .setDescription("Anime image searches")
                        .addField("Commands", map(bot, anilist));
                    break;
                case 3:
                    embed = new Discord.MessageEmbed()
                        .setTitle("📖 Help >> Economy")
                        .setDescription(
                            "Economy related commands. For example coins or doritos"
                        )
                        .addField("Commands:", map(bot, economy));
                    break;
                case 4:
                    embed = new Discord.MessageEmbed()
                        .setTitle("📖 Help >> Fun")
                        .setDescription("I'll try my best to entertain you :)")
                        .addField("Commands:", map(bot, fun));
                    break;
                case 5:
                    embed = new Discord.MessageEmbed()
                        .setTitle("📖 Help >> Image")
                        .setDescription(
                            "I can search images too, not only you have acsess to google.. b-baka >~<"
                        )
                        .addField("Commands:", map(bot, image));
                    break;
                case 6:
                    embed = new Discord.MessageEmbed()
                        .setTitle("📖 Help >> Meta")
                        .setDescription("Commands closeley-related to the bot")
                        .addField("Commands:", map(bot, meta));
                    break;
                case 7:
                    embed = new Discord.MessageEmbed()
                        .setTitle("📖 Help >> Mod")
                        .setDescription(
                            "Some moderation commands regarding the server itself"
                        )
                        .addField("Commands:", map(bot, mod));
                    break;
                case 8:
                    embed = new Discord.MessageEmbed()
                        .setTitle("📖 Help >> Reaction")
                        .setDescription(
                            "Image-anime-reaction commands like one good swap to give someone some logic"
                        )
                        .addField("Commands:", map(bot, reaction));
                    break;
                case 9:
                    embed = new Discord.MessageEmbed()
                        .setTitle("📖 Help >> Shop")
                        .setDescription("Shop some cool items")
                        .addField("Commands:", map(bot, shop));
                    break;
                case 10:
                    embed = new Discord.MessageEmbed()
                        .setTitle("📖 Help >> Social")
                        .setDescription("For your special social needs")
                        .addField("Commands:", map(bot, social));
                    break;
                case 11:
                    embed = new Discord.MessageEmbed()
                        .setTitle("📖 Help >> Trading")
                        .setDescription(
                            "For trading items got from shop or other methods"
                        )
                        .addField("Commands:", map(bot, trading));
                    break;
                case 12:
                    embed = new Discord.MessageEmbed()
                        .setTitle("📖 Help >> Utility")
                        .setDescription("Some self commands")
                        .addField("Commands:", map(bot, utility));
                    break;
                default:
                    return message.channel.send(
                        "Error while getting page, please contact dev via DM (Hax0r404#2104) or using ?bugreport command"
                    );
            }
            embed.setColor(botconfig.color);
            reactions.users.remove(message.author);
            msg.edit(embed).then((m) => reset(coll, m));
        });
    }
};

let timer;
let reset = function (collector, msg) {
    clearTimeout(timer);
    timer = setTimeout(() => {
        embed = new Discord.MessageEmbed()
            .setTitle(msg.embeds[0].title)
            .addField(msg.embeds[0].fields[0].name, msg.embeds[0].fields[0].value)
            .setColor("black");
        msg.reactions.removeAll();
        msg.edit(embed);
        collector.stop();
    }, 60000);
};
let find = function (bot, args) {
    let output = [];
    let commands = bot.commands.map((c) => c);
    for (let i = 0; i < commands.length; i++) {
        if (commands[i].help.type == args) {
            output.push(commands[i].help);
        }
    }
    return output;
};
let map = function (bot, variable) {
    if (variable.length == 0) return "No commands found!";
    let emoji = "🔲";
    let output = variable.map((cmd) => `${emoji} ${cmd.name}: ${cmd.desc}`);
    return output;
};

module.exports.help = {
    name: "help",
    type: "meta",
    desc: "helps you :)",
    use: "help",
};
