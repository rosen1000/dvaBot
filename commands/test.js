const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const welcomejson = require("../welcomes.json");
const snekfetch = require("snekfetch");

module.exports.run = async (bot, message, args) => {
    let embe = new Discord.RichEmbed()
        .setTitle('loading');
    let msg = await message.channel.send(embe);
    try {
        await msg.react('👍');
        await msg.react('👎');
    } catch (e) {
        if (e) return message.channel.send(e);
    }
    embe = new Discord.RichEmbed().setTitle('loaded')
    msg.edit(embe);

    const fileter = (reaction, user) => {
        return (reaction.emoji.name == '👍' || reaction.emoji.name == '👎') && user.id == message.author.id;
    };
    const collector = msg.createReactionCollector(fileter);
    collector.on('collect', async (reaction, coll) => {
        if (reaction.emoji == '👍') { 
            embe.addField('good', 'on u');
            msg.edit(embe);
            reaction.remove(message.author);
            reset(coll, msg);
        } else if (reaction.emoji == '👎') {
            embe.addField('bad', 'on u');
            msg.edit(embe);
            reaction.remove(message.author);
            reset(coll, msg);
        }
    });
}

let timer;
let reset = function (collector, msg) {
    clearTimeout(timer);
    timer = setTimeout(() => {
        let embed = new Discord.RichEmbed()
            .setTitle('ended')
            .setColor('black');
        msg.edit(embed);
        collector.stop();
    }, 6000);
}

module.exports.help = {
  name: "test",
  desc: "testing command do not use ~~cant use~~",
  use: "none"
}
