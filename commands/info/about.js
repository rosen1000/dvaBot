const Discord = require("discord.js");

module.exports = {
    enabled: true,
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message} message
     * @param {string[]} args
     */
    run: async (bot, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setTitle("About")
        .setColor(require("../../botconfig.json").color || "GREEN")
        .setDescription("Hello i am the D.VA bot!")
        .addField("What is my purpose?", "I'm here to enhance your discord experience, WITHOUT invading the chat")
        .addField("What do I mean \"invading\"", "By invading i mean, that i will not use the chat unless someone uses a command, meaning no xp and no coin system")
        .addField("Ok.. but how am I usefull then?", "Simply I provide some moderation and fun commands you can use for that one online fight or love story")
        .addField("What if you don't like me?", "Thats fine! The choice to keep the bot (or invite it) is yours!")
        .addField("Why do I want to be a smaller bot?", "I am tired of keeping that one reaction image on my desktop to respond to someone and that one pokemon bot just showing in the middle of conversation")
        .addField("Error division by 0!", "If i bug out, please use the dedicated commands for feedback and bug reports");
        message.channel.send(embed);
    }
}

module.exports.help = {
    name: "about",
    type: "info",
    desc: "Shows info about the bot",
    use: "about",
}
