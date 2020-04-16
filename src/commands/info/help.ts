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

function getAll(bot: BotClient) {
    let embed = new MessageEmbed().setColor(config.color);
    let commands = (category) => {
        let output: Array<string> = [];
        bot.commands.forEach((cmd) => {
            if (cmd.type == category && !cmd.hidden)
                output.push(`> \`${bot.config.prefix}${cmd.name}\` - ${cmd.description}`);
        });
        return output.join("\n");
    };

    let info = bot.categories
        .map((cat) => `**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}\n​`)
        .reduce((string, cat) => string + "\n" + cat);

    embed.setDescription(info);
    return embed;
}

function getCommand(bot: BotClient, input) {
    let embed = new MessageEmbed().setColor(config.color);
    let cmd =
        bot.commands.get(input.toLowerCase()) ||
        bot.commands.get(bot.aliases.get(input.toLowerCase()));
    let info;

    if (cmd.name) info = `**Command:** \`${cmd.name}\``;
    //TODO: dont show aliases when they dont exist
    if (cmd.aliases != [])
        info += `\n**Aliases:** ${cmd.aliases.map((a) => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Description:** ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage:** ${config.prefix}${cmd.name} ${cmd.usage}`;
        embed.setFooter("<> is required and [] is optional");
    }

    embed.setDescription(info);
    return embed;
}
