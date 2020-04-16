import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";
import { Message, MessageEmbed } from "discord.js";

module.exports = class Servers extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "servers",
            type: "info",
            description: "Shows all servers im currently in",
            enabled: true,
            hidden: true,
        });
    }
    run(message: Message, args: string[]) {
        let guilds = this.bot.guilds.cache.array().join(",\n");
        let embed = new MessageEmbed()
            .setColor(this.bot.config.color)
            .setTitle("All severs im in:")
            .setDescription(`\`\`\`fix\n${guilds}\`\`\``);
        message.channel.send(embed);
    }
};
