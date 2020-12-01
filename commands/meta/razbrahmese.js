const Discord = require("discord.js");

module.exports = {
    name: "razbrahmese",
    category: "meta",
    description: "dont mind this, its an inside joke",
    use: "razbrahmese",
    enabled: true,
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message} message
     * @param {string[]} args
     */
    run: async (bot, message, args) => {
        message.channel.send("https://media.discordapp.net/attachments/782664145056956458/783237833347170324/IMG_20201201_094705.jpg?width=373&height=640")
    }
}