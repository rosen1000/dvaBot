import { MessageEmbed, Message } from "discord.js";
import { getMember } from "../../functions/common";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";
import { config } from "../../config";
module.exports = class Avatar extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "avatar",
            type: "info",
            description: "Shows user's avatar",
            usage: "[MemberResolvable | deffault=author]",
            enabled: true,
        });
    }
    run(message: Message, args: string[]) {
        let target = getMember(message, args) ?? message.member;
        console.log(target, message)
        const embed = new MessageEmbed()
            .setAuthor(target.displayName + "'s avatar")
            .setColor(config.color)
            .setImage(target.user.avatarURL());
        message.channel.send(embed);
    }
};
