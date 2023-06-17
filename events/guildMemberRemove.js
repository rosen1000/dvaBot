//@ts-check
const Discord = require('discord.js');

/**
 * @param {Discord.Client} bot
 */
module.exports = (bot) => {
    bot.on('guildMemberRemove', async (member) => {
        if (member.guild.id == '556540661843886092') return;
        let welcomeChannel = member.guild.channels.resolve('572063723955552258');
        if (!welcomeChannel) return;
        if (welcomeChannel.isTextBased()) welcomeChannel.send(`${member.user.username} has departed to Auir!`);
    });
};
