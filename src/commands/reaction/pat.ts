import { getMember } from "../../functions/common";
import { getReaction } from "../../functions/image";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";
import { Message } from "discord.js";

module.exports = class Pat extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "pat",
            type: "reaction",
            description: "Pat your dominated ones... I mean your pets",
            usage: "[mention]",
            enabled: true,
        });
    }
    async run(message: Message, args: string[]) {
        const embed = await getReaction(this.name);
        const target = getMember(message, args[0]);
        if (target) embed.setDescription(`${target} now has inner piece`);
        else embed.setDescription(`Pati-py pat pat`);
        message.channel.send(embed);
    }
};
