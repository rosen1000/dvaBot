const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const SelfReloadJSON = require("self-reload-json");
const Coins = require("../models/user.js");

module.exports.run = async (bot, message, args) => {
  let cMember = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
  let emoji = bot.emojis.find(e => e.name == "doritos")
  if(!cMember) cMember = message.author
    
    if (!cMember) {
        Coins.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, async (e, coins) => {
                if (e) console.log(e);
                if (!coins) {
                    const newCoins = new Coins({
                        userID: message.author.id,
                        serverID: message.guild.id,
                        money: 0
                    });
                    await newCoins.save().catch(e => console.log(e));
                }
                let embed = new Discord.RichEmbed()
                    .setColor(botconfig.color)
                    .addField(emoji, message.author + " has " + coins.money + " coins");
                message.channel.send(embed);
            }
        )
    } else {
        Coins.findOne({
            userID: cMember.id,
            serverID: message.guild.id
        }, async (e, coins) => {
                if (e) console.log(e);
                if (!coins) {
                    const newCoins = new Coins({
                        userID: cMember.id,
                        serverID: message.guild.id,
                        money: 0
                    });
                    await newCoins.save().catch(e => console.log(e));
                }
                let embed = new Discord.RichEmbed()
                    .setColor(botconfig.color)
                    .addField(emoji, cMember + " has " + coins.money + " coins");
                message.channel.send(embed);
            }
        )
    }
}

module.exports.help = {
  name: "coins",
  desc: "Check your or others coins",
  use: "?coins <user>"
}
