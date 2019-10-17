module.exports.run = async (bot, message, args) => {
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!user) user = message.author;
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author, message.author.avatarURL)
        .setColor(botconfig.color)
        .setThumbnail(user.displayAvatarURL)
        .title(user.username + '#' + user.discriminator)
    message.channel.send(embed);
}

module.exports.help = {
    name: "userinfo",
    desc: "Shows basic user information",
    use: "?userinfo [user]"
}