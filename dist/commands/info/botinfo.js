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
const { formatDate } = require("../../models/common");
module.exports = {
    name: "botinfo",
    desc: "Shows basic bot information",
    use: "",
    run: (bot, message, args) => __awaiter(this, void 0, void 0, function* () {
        let uptime = bot.uptime / 1000;
        let format = "seconds";
        if (uptime > 120) {
            uptime /= 60;
            format = "minutes";
        }
        let embed = new RichEmbed()
            .setTitle("Bot info")
            .setColor(require("../../config.js").color)
            .setThumbnail(bot.user.displayAvatarURL)
            .addField("Bot name:", bot.user.username)
            .addField("Created on:", formatDate(bot.user.createdAt))
            .addField("Mem use:", (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB")
            .addField("Uptime:", `${Math.round(uptime)} ${format}`)
            .addField("Platform:", process.platform + " " + process.arch);
        message.channel.send(embed);
    })
};
