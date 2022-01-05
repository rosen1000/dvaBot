const Discord = require("discord.js");
// const keyv = require("../models/dataBase.js");

module.exports.run = async (bot, message, args) => {
    if (message.author.id != "353464955217117185") return;
    function clean(text) {
        if (typeof text == "string")
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
    }
    let $eval = args.join(" ");
    try {
        let evaled = eval($eval);
        if (typeof evaled != "string") {
            evaled = require("util").inspect(evaled);
        }
        // message.channel.send(clean(evaled), {code: "x1"})
    } catch (e) {
        message.channel.send(`ERROR \n${clean(e.stack)}`, { code: "js" });
    }
};

module.exports.help = {
    name: "eval",
    type: "admin",
    desc: "private command",
    use: "no",
};
