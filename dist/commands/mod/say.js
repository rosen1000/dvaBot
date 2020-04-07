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
module.exports = {
    name: "say",
    category: "mod",
    desc: "Makes the bot say something",
    use: "[embed]",
    enabled: true,
    run: (bot, message, args) => __awaiter(this, void 0, void 0, function* () {
        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.channel.send("Only members with `MANAGE_MESSAGES` can use that command :/");
        if (args.length < 0)
            return message.channel.send("HMM what to sayyyy");
        const color = message.guild.me.highestRole.hexColor;
        if (args[0].toLowerCase() == "embed") {
            let embed = new RichEmbed()
                .setDescription(args.slice(1).join(" "))
                .setColor(color === "#000000" ? "#ffffff" : color);
            message.channel.send(embed);
        }
        else {
            message.channel.send(args.join(" "));
        }
    })
};
