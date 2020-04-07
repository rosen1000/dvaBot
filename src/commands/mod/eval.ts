import * as Discord from "discord.js";

module.exports = {
    name: "eval",
    desc: "do not use",
    use: "",
    hidden: true,
    run: async (bot, message, args) => {
        if (message.author.id != 353464955217117185) return message.channel.send("do not use");
        function clean(text) {
            if(typeof(text) == "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
            return text;
        }
        let $eval = args.join(" ")
        try {
            let evaled = eval($eval);
            if (typeof evaled != "string") {
                evaled = require("util").inspect(evaled);
            }
            message.channel.send(clean(evaled), {code: "x1"})
        } catch(e) {
            if (e) message.channel.send(`ERROR \n${clean(e.stack)}`, {code: 'js'})
        }
    }
}
