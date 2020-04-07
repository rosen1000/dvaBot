import * as Discord from "discord.js";

module.exports = {
    name: "say",
    category: "mod",
    desc: "Makes the bot say something",
    use: "[embed]",
    enabled: true,
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.channel.send("Only members with `MANAGE_MESSAGES` can use that command :/");
        if (args.length < 0)
            return message.channel.send("HMM what to sayyyy");
        
        const color = message.guild.me.highestRole.hexColor;
        if (args[0].toLowerCase() == "embed") {
            let embed = new Discord.MessageEmbed()
                .setDescription(args.slice(1).join(" "))
                .setColor(color === "#000000" ? "#ffffff" : color);
            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }
    }
}