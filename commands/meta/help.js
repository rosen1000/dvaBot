const Discord = require("discord.js");
const botconfig = require("../../botconfig");

// TODO: ok... its a little bit fucked up, when it sends the loading embed it immediately changing to the normal menu
// TODO: the emojis were a little bit on the slower side maybe because dual connection
// TODO: lets make the index work too dou
// TODO: also collector.stop machine broke

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
        const commandMap = new Map();
        for (let c of bot.commands.map((c) => c)) {
            if (commandMap.has(c.help.type))
                commandMap.set(c.help.type, [...commandMap.get(c.help.type), c]);
            else commandMap.set(c.help.type, [c]);
        }

        const descriptionMap = new Map();
        descriptionMap.set("admin", "Server and bot managment commands");
        descriptionMap.set("anilist", "Anime image searches");
        descriptionMap.set("economy", "Economy related commands. For example coins or doritos");
        descriptionMap.set("fun", "I'll try my best to entertain you ;)");
        descriptionMap.set("image", "Let's see some spicy images");
        descriptionMap.set("meta", "Commands closeley-related to the bot");
        descriptionMap.set("mod", "Some moderation commands regarding the server itself");
        descriptionMap.set("reaction", "Huggies");
        descriptionMap.set("shop", "Shop some cool items");
        descriptionMap.set("social", "For your special social needs");
        descriptionMap.set("trading", "For trading items got from shop or other methods");
        descriptionMap.set("utility", "Some self commands");

        // let admin = find(bot, "admin");
        // let anilist = find(bot, "anilist");
        // let economy = find(bot, "economy");
        // let fun = find(bot, "fun");
        // let image = find(bot, "image");
        // let meta = find(bot, "meta");
        // let mod = find(bot, "mod");
        // let reaction = find(bot, "reaction");
        // let shop = find(bot, "shop");
        // let social = find(bot, "social");
        // let trading = find(bot, "trading");
        // let utility = find(bot, "utility");

        let i = 1;
        let text = "";
        for (const cmd of commandMap) {
            text = text.concat(`${i++}: ${capiralize(cmd[0])} (${cmd[1].length})\n`);
        }

        let embed = new Discord.MessageEmbed()
            .setTitle("📖 Help")
            .setColor(botconfig.color)
            .addField("Categories:", text.trim());
        let loadingEmbed = new Discord.MessageEmbed()
            .setTitle("Loading help embed, please wait...")
            .setColor("ffff00");
        let msg = await message.channel.send(loadingEmbed);
        let index = 0;
        const emojis = ["⏮", "◀", "▶", "⏭", "🔢"];
        emojis.forEach((e) => msg.react(e));
        const filter = (r, u) => emojis.includes(r.emoji.name) && u.id == message.author.id;
        const collector = msg.createReactionCollector(filter);
        msg.edit(embed).then(reset(collector, msg));

        collector.on("collect", async (reactions, coll) => {
            if (coll.id != message.author.id) return;
            if (reactions.emoji.name == emojis[0]) index = 0;
            else if (reactions.emoji.name == emojis[1] && index > 0) index--;
            else if (reactions.emoji.name == emojis[2] && index < emojis.length - 1) index++;
            else if (reactions.emoji.name == emojis[3]) index = commandMap.size;
            else if (reactions.emoji.name == emojis[4]) {
                let awaitMessage = await message.channel.send(
                    `Select page from 0 to ${commandMap.size}`
                );
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
                            return message.channel.send("That's not a number").then((msg) => {
                                msg.delete(3000);
                                collected.first().delete(3000);
                                awaitMessage.delete(3000);
                            });
                        else if (number > commandMap.size)
                            return message.channel
                                .send(`Page can't be more than the maximum (${commandMap.size})`)
                                .then((msg) => {
                                    msg.delete(3000);
                                    collected.first().delete(3000);
                                    awaitMessage.delete(3000);
                                });
                        else if (number < 0)
                            return message.channel
                                .send("Page can't be less than 0 (0 for main page)")
                                .then((msg) => {
                                    msg.delete(3000);
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
                    .catch(() => {
                        message.channel.send("Time ran out!").then((m) => {
                            m.delete(3000);
                            awaitMessage.delete();
                        });
                    });
            }
            delete embed;
            if (index == 0) {
                embed = new Discord.MessageEmbed()
                    .setTitle("📖 Help")
                    .addField("Categories:", text.trim());
            } else if (index <= commandMap.size) {
                embed = new Discord.MessageEmbed().setTitle();
            } else {
                return message.channel.send("Error while getting page!");
            }
            embed.setColor(botconfig.color);
            // reactions.users.remove(message.author);
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
    return variable.map((cmd) => `🔲 ${cmd.name}: ${cmd.desc}`);
};
let capiralize = function (text) {
    if (text.length <= 0) return text;
    return text.charAt(0).toUpperCase() + text.substr(1);
};

module.exports.help = {
    name: "help",
    type: "meta",
    desc: "helps you :)",
    use: "help",
};
