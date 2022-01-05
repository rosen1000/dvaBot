const Discord = require("discord.js");
const User = require("../models/user.js");

module.exports.run = async (bot, message, args) => {
    //?marry @user
    var proposed = message.mentions.members.first()
    if(!proposed) return message.reply('You didn\'t say who you want to marry >.<').catch(console.error);
    if (proposed === message.author) return message.reply(`**NOO**`);
    if (proposed === bot.user) return message.reply(`**Wanna marry me?**`);

    let u, p;
    User.findOne({
        userID: message.author.id,
        serverID: message.guild.id
    }, async (e, marry) => {
        if (e) console.log(e);
        if (!marry) {
            const newMarry = User({
                userID: message.author.id,
                serverID: message.guild.id,
                marry: "0"
            });
            await newMarry.save().catch(e => console.log(e));
        }
        u = marry;
    });

    User.findOne({
        userID: proposed.id,
        serverID: message.guild.id
    }, async (e, marry) => {
        if (e) console.log(e);
        if (!marry) {
            const newMarry = User({
                userID: proposed.id,
                serverID: message.guild.id,
                marry: undefined
            });
            await newMarry.save().catch(e => console.log(e));
        }
        p = marry;
    });

    if (u.marry != "0") return message.channel.send(`${message.author} you are already married`);
    if (p.marry != "0") return message.channel.send(`${proposed} is already married`);

    u.marry = proposed.id;
    p.marry = message.author.id;

    message.channel.send(`**${proposed} Do you accept the marry? (yes/no) you have 2 minutes to accept ${message.author} :)**`)

    const filter = m => m.id == proposed.id && m.message.content.toLocaleLowerCase().includes(["yes", "no"]);
    message.channel.awaitMessages(filter, { time: 120e3, errors: ['time'] }).then(collected => {
        if (collected.content == "no") {
            message.channel.send(`${message.author} Your marry has was denied`)
        } else if (collected.content == "yes") {
            u.save().catch(e => console.log(e));
            p.save().catch(e => console.log(e));
        }
    });
};

module.exports.help = {
    name: "marry",
    desc: "Marry someone <3",
    use: "?marry <user>"
}