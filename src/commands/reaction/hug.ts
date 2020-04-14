import { getMember } from "../../functions/common";
import { getReaction } from "../../functions/image";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";
import { Message, GuildMember } from "discord.js";

module.exports = class Hug extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "hug",
            type: "reaction",
            description: "Hug someone who needs some love",
            usage: "[mention]",
            enabled: true,
        });
    }
    async run(message: Message, args: string[]) {
        const embed = await getReaction(this.name);
        const target: GuildMember = getMember(message, args);
        console.log(target)
        if (target)
            embed.setDescription(
                `${message.member} hugged ${target}, aww they look cute`
            );
        else
            embed.setDescription(
                `${message.member} don't worry i'm here for you *hugs*`
            );
        message.channel.send(embed);
    }
};
