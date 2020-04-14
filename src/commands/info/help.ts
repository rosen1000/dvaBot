import { MessageEmbed, Message } from "discord.js";
import { stripIndents } from "common-tags";
import { config } from "../../config.js";
import { Command } from "../../models/Command.js";
import { BotClient } from "../../models/BotClient.js";

module.exports = class Help extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "help",
            aliases: ["h"],
            type: "info",
            description: "Shows the help command... basicly that one",
            usage: "[command | aliases]",
            enabled: true,
        });
    }
    run(message: Message, args: string[]) {
        let embed;
        if (args[0]) embed = getCommand(this.bot, args[0]);
        else embed = getAll(this.bot);
        if (!embed) embed = getAll(this.bot);
        message.channel.send(embed);
    }
};

function getAll(bot) {
    let embed = new MessageEmbed().setColor(config.color);
    let commands = (category) => {
        return bot.commands
            .filter((cmd) => cmd.category == category)
            .map((cmd) => `> \`${cmd.name}\` - ${cmd.desc}`)
            .join("\n");
    };

    let info = bot.categories
        .map(
            (cat) =>
                stripIndents`**${
                    cat[0].toUpperCase() + cat.slice(1)
                }** \n${commands(cat)}`
        )
        .reduce((string, cat) => string + "\n" + cat);

    embed.setDescription(info);
    return embed;
}

function getCommand(bot, input) {
    let embed = new MessageEmbed().setColor(config.color);
    let cmd =
        bot.commands.get(input.toLowerCase()) ||
        bot.commands.get(bot.aliases.get(input.toLowerCase()));
    let info;

    if (cmd.name) info = `**Command:** \`${cmd.name}\``;
    if (cmd.aliases)
        info += `\n**Aliases:** ${cmd.aliases
            .map((a) => `\`${a}\``)
            .join(", ")}`;
    if (cmd.desc) info += `\n**Description:** ${cmd.desc}`;
    if (cmd.use) {
        info += `\n**Usage:** ${config.prefix}${cmd.name}${cmd.use}`;
        embed.setFooter("<> is required and [] is optional");
    }

    embed.setDescription(info);
    return embed;
}
