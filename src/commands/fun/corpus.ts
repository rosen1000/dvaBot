import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";
import { Message } from "discord.js";

module.exports = class Corpus extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "corpus",
            type: "fun",
            aliases: ["corp"],
            description: "Translate to Warframe Corpus language",
            usage: "<text>",
            enabled: true,
        });
    }
    run(message: Message, args: string[]) {
        let arg = args.join(" ");
        args = arg.split("");
        let a = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
                "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "I", "M", "N", 'O', "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        let b = ["a", "t", "y", "p", "e", "t", "j", "k", "i", "t", "k", "p", "s", "t", "o", "k", "r", "t", "y", "p", "u", "t", "j", "k", "y", "b",
                "A", "T", "Y", "P", "E", "T", "J", "K", "I", "T", "K", "P", "S", "T", "O", "K", "R", "T", "Y", "P", "U", "T", "J", "K", "Y", "B"];
        let index;
        let str = [];
        for (let i = 0; i < arg.length; i++) {
            index = a.indexOf(arg[i]);
            if (index != -1) {
                str[i] = b[index];
            }
        }
        message.channel.send(str.join(""));
    }
};
