const { getMember } = require("../../models/common");
const { RichEmbed } = require("discord.js");
module.exports = {
    name: "avatar",
    category: "info",
    desc: "Shows user's avatar",
    use: "[username | id | mention | deffault=author]",
    enabled: true,
    run: async (bot, message, args) => {
        let target = getMember(message, args[0]);
        if (!target) target = message.member;
        const embed = new RichEmbed()
            .setAuthor(target.nickname + "'s avatar")
            .setColor(require("../../botconfig.json").color)
            .setImage(target.user.displayAvatarURL);
        message.channel.send(embed);
    }
}