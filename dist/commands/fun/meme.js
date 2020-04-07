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
    name: "meme",
    category: "fun",
    desc: "Posts random meme from r/meme r/dankmeme or r/me_irl",
    use: "meme",
    enabled: true,
    run: (bot, message, args) => __awaiter(this, void 0, void 0, function* () {
        const reddits = ["dankmeme", "meme", "me_irl"];
        const random = reddits[Math.floor(Math.random() * reddits.length)];
        const meme = yield randomPuppy(random);
        const embed = new RichEmbed()
            .setColor(require("../../config.js").color)
            .setImage(meme)
            .setTitle(`r/${random}`)
            .setURL(`https://reddit.com/r/${random}`);
        message.channel.send(embed);
    })
};
