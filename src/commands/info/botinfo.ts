import { MessageEmbed, Message } from "discord.js";
import { formatDate } from "../../functions/common";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";

module.exports = class Botinfo extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "botinfo",
            type: "info",
            description: "Shows basic bot information",
            usage: "",
            enabled: true,
        });
    }
    run(message: Message, args: string[]) {
        let uptime = this.bot.uptime / 1000;
        let format = "seconds";
        if (uptime > 120) {
            uptime /= 60;
            format = "minutes";
        }
        let embed = new MessageEmbed()
            .setTitle("Bot info")
            .setColor(require("../../config.js").color)
            .setThumbnail(this.bot.user.displayAvatarURL())
            .addField("Bot name:", this.bot.user.username)
            .addField("Created on:", formatDate(this.bot.user.createdAt))
            .addField(
                "Mem use:",
                (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB"
            )
            .addField("Uptime:", `${Math.round(uptime)} ${format}`)
            .addField("Platform:", process.platform + " " + process.arch);
        message.channel.send(embed);
    }
};
