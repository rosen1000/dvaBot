const Discord = require("discord.js");
const botconfig = require("../botconfig");
const User = require("../models/user.js");

module.exports.run = async (bot, message, args) => {
    var member = message.mentions.members.first();
    if (!member) {
        member = message.author;
    }
    
    let diff, currxp, currLevel, nextLevelXP;
    User.findOne({
        userID: member.id,
        serverID: message.guild.id
    }, async (e, xp) => {
        if (e) console.log(e);
        if (!xp) {
            const newXP = new User({
                userID: member.id,
                serverID: message.guild.id,
                xp: 0,
                level: 1
            });
            await newXP.save().catch(e => console.log(e));
        }
        currxp = xp.xp;
        currLevel = xp.level;
        nextLevelXP = (currLevel + 2) * 300;
        diff = nextLevelXP - currxp;
    });

    let lvlEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor(botconfig.color)
        .addField("Level", currLevel, true)
        .addField("XP", currxp, true)
        .setFooter(`${diff} XP until next level`, message.author.displayAvatarURL);
    message.channel.send(lvlEmbed);
}

module.exports.help = {
    name: "level",
    desc: "Shows user level, xp and xp needed for next level",
    use: "?level [user]"
}
