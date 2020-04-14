import { MessageEmbed, Message } from "discord.js";
import axios from "axios";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";

module.exports = class EightBall extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "8ball",
            type: "fun",
            description: "Ask the 8ball something you wonder about",
            usage: "<question>",
            enabled: true,
        });
    }
    run(message: Message, args: string[]) {
        let question = args.join(" ");
        if (!question)
            return message.channel.send("You haven't asked me something!");

        axios.get("https://nekos.life/api/v2/8ball").then((response) => {
            let embed = new MessageEmbed()
                .addField("Question:", question)
                .addField("Answer:", response.data.response)
                .setImage(response.data.url)
                .setColor(require("../../config.js").color);
            message.channel.send(embed);
        });
    }
};
