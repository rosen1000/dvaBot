var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Discord = require("discord.js");
module.exports = {
    name: "eval",
    desc: "do not use",
    use: "",
    hidden: true,
    run: (bot, message, args) => __awaiter(this, void 0, void 0, function* () {
        if (message.author.id != 353464955217117185)
            return message.channel.send("do not use");
        function clean(text) {
            if (typeof (text) == "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }
        let $eval = args.join(" ");
        try {
            let evaled = eval($eval);
            if (typeof evaled != "string") {
                evaled = require("util").inspect(evaled);
            }
            message.channel.send(clean(evaled), { code: "x1" });
        }
        catch (e) {
            if (e)
                message.channel.send(`ERROR \n${clean(e.stack)}`, { code: 'js' });
        }
    })
};
