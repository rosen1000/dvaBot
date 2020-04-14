import { MessageEmbed, Message } from "discord.js";
import { getMember } from "../../functions/common";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";
module.exports = class Avatar extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "avatar",
            type: "info",
            description: "Shows user's avatar",
            usage: "[username | id | mention | deffault=author]",
            enabled: true,
        });
    }
    run(message: Message, args: string[]) {
        let target = getMember(message, args[0]);
        if (!target) target = message.member;
        const embed = new MessageEmbed()
            .setAuthor(target.nickname + "'s avatar")
            .setColor(require("../../config.js").color)
            .setImage(target.user.avatarURL());
        message.channel.send(embed);
    }
};
