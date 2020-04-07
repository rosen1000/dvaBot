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
    name: "invite",
    type: "info",
    desc: "Sends invite link for the bot",
    use: "",
    run: (bot, message, args) => __awaiter(this, void 0, void 0, function* () {
        let embed = RichEmbed()
            .setColor(require("../../config.js"))
            .setTitle("Invite:")
            .setDescription("[Invite me](https://discordapp.com/api/oauth2)");
        message.channel.send(embed);
    })
};
