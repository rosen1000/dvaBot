var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { RichEmbed } = require("discord.js");
const { getMember } = require("../../models/common");
module.exports = {
    name: "love",
    aliases: ["luv", "wuv"],
    category: "fun",
    description: "Predicts how much 2 people love each other",
    use: "<mention | id | args>",
    enabled: true,
    run: (bot, message, args) => __awaiter(this, void 0, void 0, function* () {
        let lover = getMember(message, args[0]);
        if (lover) {
            return message.channel.send("Who is the lucky one :)");
        }
        else if (message.author.id == lover.id) {
            return message.channel.send("I love chu dear");
        }
        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveMeter = "💓".repeat(loveIndex) + "💔".repeat(10 - loveIndex);
        const embed = new RichEmbed()
            .setColor(require("../../config.js").color)
            .setTitle(`${message.author} x ${lover}`)
            .addField(`${love}/100`, loveMeter);
        message.channel.send(embed);
    })
};
