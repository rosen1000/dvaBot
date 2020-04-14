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
    run(message: Message, args: string[]) {
        let embed = new MessageEmbed()
            .setColor(require("../../config.js"))
            .setTitle("Invite:")
            .setDescription(`[Invite me](${this.bot.generateInvite("ADMINISTRATOR")})`);
        message.channel.send(embed);
    }
};
