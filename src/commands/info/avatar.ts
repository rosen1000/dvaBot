import { MessageEmbed } from "discord.js";
import { getMember } from "../../models/common";
module.exports = {
    name: "avatar",
    category: "info",
    desc: "Shows user's avatar",
    use: "[username | id | mention | deffault=author]",
    enabled: true,
    run: async (bot, message, args) => {
        let target = getMember(message, args[0]);
        if (!target) target = message.member;
        const embed = new MessageEmbed()
            .setAuthor(target.nickname + "'s avatar")
            .setColor(require("../../config.js").color)
            .setImage(target.user.avatarURL());
        message.channel.send(embed);
    }
}