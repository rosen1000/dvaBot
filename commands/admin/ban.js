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
    let bReason = args.join(" ") || "breaking the rules";

    if (!message.member.permissions.has("BAN_MEMBERS"))
        return message.channel.send("You cant ban members");
    if (member.permissions.has("BAN_MEMBERS"))
        return message.channel.send("He can ban too :/");
    if (!member.bannable) return message.channel.send("I can't ban him tho");

    member.ban(bReason);
    message.channel.send(`Banned ${member.user.username}`);

    let channel = message.guild.channels.cache.find((ch) => ch.name == "incidents");
    if (!channel) return;
    let banEmbed = new Discord.MessageEmbed()
        .setDescription("---===Ban===---")
        .setColor(botconfig.ban)
        .addField("Banned user", `${member}`)
        .addField("banned by", `<@${message.author.id}>`)
        .addField("banned in", message.createdAt)
        .addField("reason:", bReason);
    channel.send(banEmbed);
};

module.exports.help = {
    name: "ban",
    type: "admin",
    desc: "bans someone for being too bad >~<",
    use: "ban <user> [reason]",
};
