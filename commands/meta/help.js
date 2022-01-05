const Discord = require("discord.js");
const botconfig = require("../../botconfig");
const emojis = ["⏮", "◀", "▶", "⏭", "🔢"];
const commandMap = new Map();
const descriptionMap = new Map();
const loadingEmbed = new Discord.MessageEmbed()
    .setTitle("Loading help embed, please wait...")
    .setColor("ffff00");

/**
 * @type {Map<Discord.Snowflake,NodeJS.Timeout>}
 */
let timer = new Map();
let index = 0;

/**
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (bot, message, args) => {
    if (args[0]) {
        let embed = new Discord.MessageEmbed();
        if (bot.commands.has(args[0])) {
            command = bot.commands.get(args[0]);
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
        if (commandMap.size < 1) {
            for (let c of bot.commands.map((c) => c)) {
                if (commandMap.has(c.help.type))
                    commandMap.set(c.help.type, [...commandMap.get(c.help.type), c]);
                else commandMap.set(c.help.type, [c]);
            }
        }

        if (descriptionMap.size < 1) {
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
        }

        let i = 1;
        let text = "";
        for (const cmd of commandMap) {
            text = text.concat(`${i++}: ${capitalize(cmd[0])} (${cmd[1].length})\n`);
        }

        let embed = new Discord.MessageEmbed()
            .setTitle("📖 Help")
            .setColor(botconfig.color)
            .addField("Categories:", text.trim());
        let msg = await message.channel.send(loadingEmbed);
        for (let i = 0; i < emojis.length; i++) await msg.react(emojis[i]);

        const filter = (r, u) => emojis.includes(r.emoji.name) && u.id == message.author.id;
        const collector = msg.createReactionCollector(filter);
        msg.edit(embed).then(reset(collector, msg));

        /**
         * @param {Discord.MessageReaction} reaction
         * @param {Discord.User} user
         * @returns {void}
         */
        let collectorHandler = async function (reaction, user) {
            if (user.id != message.author.id) return;
            if (reaction.emoji.name == emojis[0]) index = 0;
            else if (reaction.emoji.name == emojis[1] && index > 0) index--;
            else if (reaction.emoji.name == emojis[2] && index < commandMap.size) index++;
            else if (reaction.emoji.name == emojis[3]) index = commandMap.size;
            else if (reaction.emoji.name == emojis[4]) {
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
                    .then(async (collected) => {
                        let number = parseInt(collected.first().content);
                        let del = (msg) => {
                            msg.delete(3000);
                            collected.first().delete(3000);
                            awaitMessage.delete(3000);
                        };
                        if (number == NaN) {
                            const msg = await message.channel.send("That's not a number");
                            return del(msg);
                        }
                        if (number > commandMap.size) {
                            const msg = await message.channel
                                .send(`Page can't be more than the maximum (${commandMap.size})`);
                            return del(msg);
                        }
                        if (number < 0) {
                            const msg = await message.channel
                                .send("Page can't be less than 0 (0 for main page)");
                            return del(msg);
                        }

                        index = number;
                        message.channel.send("Done!").then(del);
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
                let commandArr = [];
                commandMap.forEach((c) => commandArr.push(c));
                embed = new Discord.MessageEmbed()
                    .setTitle("📖 Help >> " + capitalize(commandArr[index - 1][0].help.type))
                    .setDescription(descriptionMap.get(commandArr[index - 1][0].help.type))
                    .addField(
                        "Commands:",
                        commandArr[index - 1].map((cmd) => `${cmd.help.name}: ${cmd.help.desc}`)
                    );
            } else {
                return message.channel.send("Error while getting page!");
            }
            embed.setColor(botconfig.color);
            msg.edit(embed).then((m) => reset(collector, m));
        };
        collector.on("collect", collectorHandler);
        collector.on("remove", collectorHandler);
    }
};

/**
 * @param {Discord.ReactionCollector} collector
 * @param {Discord.Message} msg
 */
let reset = function (collector, msg) {
    clearTimeout(timer[msg.guild.id]);
    timer[msg.guild.id] = setTimeout(() => {
        embed = new Discord.MessageEmbed()
            .setTitle(msg.embeds[0].title)
            .addField(msg.embeds[0].fields[0].name, msg.embeds[0].fields[0].value)
            .setColor("#36393F");
        msg.reactions.removeAll();
        msg.edit(embed);
        collector.stop();
    }, 60000);
};

let capitalize = function (text) {
    if (text.length <= 0) return text;
    return text.charAt(0).toUpperCase() + text.substr(1);
};

module.exports.help = {
    name: "help",
    type: "meta",
    desc: "helps you :)",
    use: "help",
};
