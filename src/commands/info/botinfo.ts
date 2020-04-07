import { MessageEmbed } from "discord.js";
import { formatDate } from "../../functions/common";

module.exports = {
    name: "botinfo",
    desc: "Shows basic bot information",
    use: "",
    run: async (bot, message, args) => {
        let uptime = bot.uptime / 1000;
        let format = "seconds"
        if (uptime > 120) {
            uptime /= 60;
            format = "minutes";
        }
        let embed = new MessageEmbed()
            .setTitle("Bot info")
            .setColor(require("../../config.js").color)
            .setThumbnail(bot.user.displayAvatarURL)
            .addField("Bot name:", bot.user.username)
            .addField("Created on:", formatDate(bot.user.createdAt))
            .addField("Mem use:", (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB")
            .addField("Uptime:", `${Math.round(uptime)} ${format}`)
            .addField("Platform:", process.platform + " " + process.arch);
        message.channel.send(embed);
    }
}