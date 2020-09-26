const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {
    if (!args[0]) var sides = 6;
    else var sides = args[0];

    var output = Math.floor(Math.random() * sides) + 1;
    if (output == "NaN") return message.channel.send("Not valid number provided");
    message.channel.send(output);
};

module.exports.help = {
    name: "dice",
    type: "fun",
    desc: "Roll a dice with x sides (aka randommizer)",
    use: "dice <sides in number(default = 6)>",
};
