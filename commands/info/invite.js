const { RichEmbed } = require("discord.js");

module.exports = {
    name: "invite",
    type: "info",
    desc: "Sends invite link for the bot",
    use: "",
    run: async (bot, message, args) => {
        let embed = RichEmbed()
            .setColor(require("../../config.js"))
            .setTitle("Invite:")
            .setDescription("[Invite me](https://discordapp.com/api/oauth2)")
        message.channel.send(embed);
    }
}
