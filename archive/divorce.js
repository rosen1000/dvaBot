const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const fs = require("fs");
let Marry = JSON.parse(fs.readFileSync("./marries.json", "utf8"));

module.exports.run = async (bot, message, args) => {
    let divorced = message.mentions.members.first();
    if(!divorced) return message.channel.send("You didn't sayd who you want to devorce");

    if(!Marry[divorced.id]){
        Marry[divorced.id] = {
            marry: 0
        }
    }

    if(Marry[divorced.id].marry == 0){
        var embed = new Discord.RichEmbed()
        .setDescription(`you havent married anyone`)
        .setColor(botconfig.color);
    }else{
        Marry[message.author.id] = {
            marry: 0
        }
        Marry[divorced.id] = {
            marry: 0
        }

        fs.writeFileSync("./marries.json", JSON.stringify(Marry), (err) => {
            if(err) console.log(err);
        })
        var embed = new Discord.RichEmbed()
        .setDescription(`${message.author} and ${divorced} are now divorced :cry:`)
        .setColor(botconfig.color);
    }

    message.channel.send(embed);
}

module.exports.help = {
    name: "divorce",
    desc: "Removes a marry :broken_heart:",
    use: "?divorce <user>"
}