var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const botconfig = require("../../config.js");
module.exports = {
    name: "help",
    aliases: ["h"],
    category: "info",
    desc: "Shows the help command... basicly that one",
    use: "[command | aliases]",
    enabled: true,
    run: (bot, message, args) => __awaiter(this, void 0, void 0, function* () {
        let embed;
        if (args[0])
            embed = getCommand(bot, args[0]);
        else
            embed = getAll(bot);
        if (!embed)
            embed = getAll(bot);
        message.channel.send(embed);
    })
};
function getAll(bot) {
    let embed = new RichEmbed().setColor(botconfig.color);
    let commands = (category) => {
        return bot.commands
            .filter(cmd => cmd.category == category)
            .map(cmd => `> \`${cmd.name}\` - ${cmd.desc}`)
            .join("\n");
    };
    let info = bot.categories
        .map(cat => stripIndents `**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, cat) => string + "\n" + cat);
    embed.setDescription(info);
    return embed;
}
function getCommand(bot, input) {
    let embed = new RichEmbed().setColor(botconfig.color);
    let cmd = bot.commands.get(input.toLowerCase()) || bot.commands.get(bot.aliases.get(input.toLowerCase()));
    let info;
    if (cmd.name)
        info = `**Command:** \`${cmd.name}\``;
    if (cmd.aliases)
        info += `\n**Aliases:** ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.desc)
        info += `\n**Description:** ${cmd.desc}`;
    if (cmd.use) {
        info += `\n**Usage:** ${botconfig.prefix}${cmd.name}${cmd.use}`;
        embed.setFooter("<> is required and [] is optional");
    }
    embed.setDescription(info);
    return embed;
}
