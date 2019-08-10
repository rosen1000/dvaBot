const botconfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!kUser) return message.channel.send("Couldn't find user.");
    let reason = args.join(" ") || "breaking rules";

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("How about you can't kick ppl!");
    if (kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("But he is admin :/");
    if (!kUser.kickable) return message.channel.send("I can't kick him tho");

    let kickEmbed = new Discord.RichEmbed()
        .setDescription('---===Kick===---')
        .setColor(botconfig.ban)
        .addField("Banned user", `${kUser}`)
        .addField('banned by', `<@${message.author.id}>`)
        .addField('banned in', message.createdAt)
        .addField('reason:', reason);

    message.guild.member(kUser).kick(reason);
    message.channel.send(`${kUser} has been kicked`)

    let channel = message.guild.channel.find(ch => ch.name == "incidents");
    if (!channel) return;
    channel.send(kickEmbed)
}

module.exports.help = {
    name: "kick",
    type: "admin",
    desc: "Kicks a user who is not following the rules",
    use: "?kick [user] <reason>"
}