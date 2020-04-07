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
const randomPuppy = require("random-puppy");
module.exports = {
    name: "animeme",
    category: "fun",
    desc: "Posts random meme from r/animemes",
    use: "animeme",
    enabled: true,
    run: (bot, message, args) => __awaiter(this, void 0, void 0, function* () {
        const animeme = yield randomPuppy("animeme");
        const embed = new RichEmbed()
            .setColor(require("../../config.js").color)
            .setImage(animeme)
            .setTitle("Animeme!")
            .setURL("https://reddit.com/r/animemes/");
        message.channel.send(embed);
    })
};
