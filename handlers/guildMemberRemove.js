module.exports = (bot) => {
    bot.on("guildMember", async (member) => {
        let welcomeChannel = member.guild.channels.find(ch => ch.name == "welcome");
        if (welcomeChannel) welcomeChannel.send(`${member.user.username} has departed to Auir!`);
    });
}