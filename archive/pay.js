const Discord = require("discord.js");
const User = require("../models/user.js");

module.exports.run = async (bot, message, args) => {
    let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    let given = parseInt(args[1]);
    
    if (isNaN(given) || !given) return message.channel.send("how many will you pay him")
    
    let u, p;
    User.findOne({
        userID: message.author.id,
        serverID: message.guild.id
    }, async (e, coins) => {
            if (e) console.log(e);
            if (!coins) {
                const newCoins = new User({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    money: 0
                });
                await newCoins.save().catch(e => console.log(e));
                return message.channel.send("Can't affort that :/");
            }
            if (coins.money < given) return message.channel.send("Not enoght minerals");
            u = coins;
        })

    User.findOne({
        userID: pUser.author.id,
        serverID: message.guild.id
    }, async (e, coins) => {
            if (e) console.log(e);
            if (!coins) {
                const newCoins = new User({
                    userID: pUser.id,
                    serverID: message.guild.id,
                    money: 0
                });
                await newCoins.save().catch(e => console.log(e));
                return message.channel.send("Paying failed... sorry try again");
            }
            p = coins;
    })

    u = u.money - given;
    p = p.money + given;

    save(u, p);

    message.channel.send(`${message.author} gave ${args[1]} coins to ${pUser}!`)
}

async function save(u, p) {
    await u.save().catch(e => console.log(e));
    await p.save().catch(e => console.log(e));
}

module.exports.help = {
    name: "pay",
    desc: "Give someone from your coins",
    use: "?pay [user] [money in numbers]"
}
