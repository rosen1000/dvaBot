import { MessageEmbed, Message } from "discord.js";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";

module.exports = class Feedback extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "feedback",
            type: "info",
            description: "Send feedback to the bot owner",
            usage: "<text>",
            enabled: true,
        });
    }
    run(message: Message, args: string[]) {
        if (!args[0]) return message.channel.send("Please tell me something");
        let feedback = args.join(" ");
        let embed = new MessageEmbed()
            .setColor(require("../../config.js").color)
            .setAuthor(message.author.tag)
            .setThumbnail(message.author.displayAvatarURL())
            .addField("Feedback:", feedback)
            .setFooter("In server: " + message.guild.name);
        this.bot.users.fetch("353464955217117185").then((u) => u.send(embed));
        message.channel.send("👍");
    }
};
