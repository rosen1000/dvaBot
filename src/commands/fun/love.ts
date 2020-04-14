import * as Discord from "discord.js";
import { getMember } from "../../functions/common";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";

module.exports = class Love extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "love",
            aliases: ["luv", "wuv"],
            type: "fun",
            description: "Predicts how much 2 people love each other",
            usage: "<mention | id | args>",
            enabled: true,
        });
    }
    run(message: Discord.Message, args: string[]) {
        let lover = getMember(message, args[0]);
        if (lover) {
            return message.channel.send("Who is the lucky one :)");
        } else if (message.author.id == lover.id) {
            return message.channel.send("I love chu dear");
        }
        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveMeter = "💓".repeat(loveIndex) + "💔".repeat(10 - loveIndex);
        const embed = new Discord.MessageEmbed()
            .setColor(require("../../config.js").color)
            .setTitle(`${message.author} x ${lover}`)
            .addField(`${love}/100`, loveMeter);
        message.channel.send(embed);
    }
};
