import { MessageEmbed, Message } from "discord.js";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";

module.exports = class Invite extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "invite",
            type: "info",
            description: "Sends invite link for the bot",
            usage: "",
            enabled: true,
        });
    }
    async run(message: Message, args: string[]) {
        let embed = new MessageEmbed()
            .setColor(this.bot.config.color)
            .setTitle("Invite:")
            .setDescription(`[Invite me ❤️](${await this.bot.generateInvite("ADMINISTRATOR")})`);
        message.channel.send(embed);
    }
};
