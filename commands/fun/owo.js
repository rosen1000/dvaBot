const Discord = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "owo",
    category: "fun",
    desc: "OwOifies text",
    use: "<text>",
    run: async (bot, message, args) => {
        axios.get("https://nekos.life/api/v2/owoify?text=" + encodeURI(args.join(" "))).then(response => {
            if (response.data.msg)
                message.channel.send(response.data.msg);
            else
                message.channel.send(response.data.owo);
        });
    }
}