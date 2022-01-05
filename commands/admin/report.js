const botconfig = require("../../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let member =
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
            (m) =>
                m.user.username == args.join(" ") || m == message.mentions.members.first()
        );
    if (!member) return message.channel.send("Couldn't find user.");
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.MessageEmbed()
        .setDescription("Reports")
        .setColor(botconfig.color)
        .addField("Reported user", `${member} with ID: ${member.id}`)
        .addField("Reported by", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel", message.channel.name)
        .addField("Time", message.createdAt)
        .addField("Reason", reason);

    let reportschannel = message.guild.channels.cache.find((ch) => ch.name == "reports");
    if (!reportschannel) return message.channel.send("Couldn't find reports Channel.");

    message.delete().catch((O_o) => {});
    reportschannel.send(reportEmbed);
};

module.exports.help = {
    name: "report",
    type: "admin",
    desc: "Report someone if he is bad",
    use: "report <user> <reason>",
};
