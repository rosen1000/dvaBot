import * as Discord from "discord.js";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";

module.exports = class Say extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "say",
            type: "mod",
            description: "Makes the bot say something",
            usage: "[embed]",
            enabled: true,
        });
    }
    run(message: Discord.Message, args: string[]) {
        if (!message.member.permissions.has("MANAGE_MESSAGES"))
            return message.channel.send(
                "Only members with `MANAGE_MESSAGES` can use that command :/"
            );
        if (args.length < 0) return message.channel.send("HMM what to sayyyy");

        const color = message.guild.me.roles.highest.hexColor;
        if (args[0].toLowerCase() == "embed") {
            let embed = new Discord.MessageEmbed()
                .setDescription(args.slice(1).join(" "))
                .setColor(color === "#000000" ? "#ffffff" : color);
            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }
    }
};
