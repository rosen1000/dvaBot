var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { getMember } = require("../../models/common");
const { RichEmbed } = require("discord.js");
module.exports = {
    name: "avatar",
    category: "info",
    desc: "Shows user's avatar",
    use: "[username | id | mention | deffault=author]",
    enabled: true,
    run: (bot, message, args) => __awaiter(this, void 0, void 0, function* () {
        let target = getMember(message, args[0]);
        if (!target)
            target = message.member;
        const embed = new RichEmbed()
            .setAuthor(target.nickname + "'s avatar")
            .setColor(require("../../config.js").color)
            .setImage(target.user.displayAvatarURL);
        message.channel.send(embed);
    })
};
