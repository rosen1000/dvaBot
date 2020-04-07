import { MessageEmbed } from "discord.js";

module.exports = {
    name: "feedback",
    type: "info",
    desc: "Send feedback to the bot owner",
    use: "<text>",
    run: async (bot, message, args) => {
        if (!args[0]) return message.channel.send("Please tell me something");
        let feedback = args.join(" ");
        let embed = new MessageEmbed()
            .setColor(require("../../config.js").color)
            .setAuthor(message.author.tag)
            .setThumbnail(message.author.displayAvatarURL)
            .addField("Feedback:", feedback)
            .setFooter("In server: " + message.guild.name);
        bot.users.get("353464955217117185").send(embed);
        message.channel.send("👍");
    }
}