const { RichEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "8ball",
    type: "fun",
    desc: "Ask the 8ball something you wonder about",
    use: "<question>",
    run: async (bot ,message, args) => {
        let question = args.join(" ");
        if (!question) return message.channel.send("You haven't asked me something!");

        axios.get("https://nekos.life/api/v2/8ball").then(response => {
            let embed = new RichEmbed()
                .addField("Question:", question)
                .addField("Answer:", response.data.response)
                .setImage(response.data.url)
                .setColor(require("../../config.js").color);
            message.channel.send(embed);
        });
    }
}