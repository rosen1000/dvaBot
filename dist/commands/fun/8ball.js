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
const axios = require("axios");
module.exports = {
    name: "8ball",
    type: "fun",
    desc: "Ask the 8ball something you wonder about",
    use: "<question>",
    run: (bot, message, args) => __awaiter(this, void 0, void 0, function* () {
        let question = args.join(" ");
        if (!question)
            return message.channel.send("You haven't asked me something!");
        axios.get("https://nekos.life/api/v2/8ball").then(response => {
            let embed = new RichEmbed()
                .addField("Question:", question)
                .addField("Answer:", response.data.response)
                .setImage(response.data.url)
                .setColor(require("../../config.js").color);
            message.channel.send(embed);
        });
    })
};
