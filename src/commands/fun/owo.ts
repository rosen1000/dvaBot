import * as Discord from "discord.js";
import axios from "axios";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";

module.exports = class Owo extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "owo",
            type: "fun",
            description: "OwOifies text",
            usage: "<text>",
            enabled: true,
        });
    }
    run(message, args) {
        axios
            .get(
                "https://nekos.life/api/v2/owoify?text=" +
                    encodeURI(args.join(" "))
            )
            .then((response) => {
                if (response.data.msg) message.channel.send(response.data.msg);
                else message.channel.send(response.data.owo);
            });
    }
};
