const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const User = require("../models/user.js");

module.exports.run = async (bot, message, args) => {
    let porposed = message.mentions.members.first()
    if(!porposed) porposed = message.author

    User.findOne({
        userID: porposed.id,
        serverID: message.guild.id
    }, async (e, marry) => {
        if (e) console.log(e);
        if (!marry) {
            const newMarry = new User({
                userID: porposed.id,
                serverID: message.guild.id,
                marry: 0
            });
            await newMarry.save().catch(e => console.log(e));
        }
            
        if (marry.marry == 0) {
            var embed = new Discord.RichEmbed()
                .addField("Marry", `${porposed} isn't married to anyone`)
                .setColor(botconfig.color);
            message.channel.send(embed);
        } else {
            var embed = new Discord.RichEmbed()
                .addField("Marry", `${porposed} and <@${Marry[porposed.id].marry}>`)
                .setColor(botconfig.color);
            message.channel.send(embed);
        }
    });
}

module.exports.help = {
    name: "married",
    desc: "Shows to who the user is married to",
    use: "?married [user]"
}