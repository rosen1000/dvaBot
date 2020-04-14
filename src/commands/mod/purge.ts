import { config } from "../../config";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";
import { Message } from "discord.js";

module.exports = class Purge extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "purge",
            aliases: ["clear"],
            type: "mod",
            description:
                "Clears the chat from spam (must be less than 2 weeks ago)",
            usage: "<number>",
            enabled: true,
        });
    }

    run(message: Message, args: string[]) {
        if (!message.guild.me.permissions.has("MANAGE_MESSAGES"))
            return message.channel.send("Even *I* can't delete messages :(");
        if (!message.member.permissions.has("MANAGE_MESSAGES"))
            return message.channel.send("Sorry, you can't delete messages!");

        let number = parseInt(args[0]);
        if (!number)
            return message.channel.send("How many should i delete tho");
        if (typeof number != "number")
            return message.channel.send("I don't see a number");

        message.delete();
        message.channel
            .bulkDelete(number)
            .then(() => {
                message.channel
                    .send(`Purged ${number} messages`)
                    .then((m) => m.delete({ timeout: 3500 }));
            })
            .catch((e) => {
                if (e) message.channel.send("Error ocured!");
            });
    }
};
