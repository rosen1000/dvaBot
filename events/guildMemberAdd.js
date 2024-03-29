//@ts-check
const Discord = require('discord.js');

/**
 * @param {Discord.Client} bot
 */
module.exports = (bot) => {
    bot.on('guildMemberAdd', async (member) => {
        // Eva's server
        if (member.guild.id == '514125758751440896') {
            //Add roles to new members
            try {
                await member.roles.add('631220643647455292');
            } catch (e) {
                if (e) console.error(e);
            }

            //Welcome new members
            let rules = member.guild.channels.cache.find((ch) => ch.id == '519828142370586625');
            let intro = member.guild.channels.cache.find((ch) => ch.id == '604352341726199838');
            let welcomeChannel = member.guild.channels.cache.get('514125758751440900');
            if (welcomeChannel?.isTextBased())
                welcomeChannel.send(
                    `Welcome ${member} Make sure to read and follow the ${rules} and introduce yourself in ${intro}. Have a great time!`,
                );
            return;
        }
        // Our server
        if (member.guild.id == '556540661843886092') {
            if (!member.user.bot) {
                // Give member
                await member.roles.add('563762491927298048');
                let welcomeChannel = member.guild.channels.cache.get('572063723955552258');
                if (welcomeChannel?.isTextBased())
                    welcomeChannel.send(`Friendly reminder, ${member.user.username} is new to discord!`);
            } else {
                // Give bot
                await member.roles.add('564510092851019792');
            }
        }
    });
};
