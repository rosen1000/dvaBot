const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    function clean(text){
        if(typeof(text) == "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
        return text;
    }
    let $eval = args.join(" ")
    try{
        let evaled = eval($eval);
        if(typeof evaled != "string"){
            evaled = require("util").inspect(evaled);
        }
        // message.channel.send(clean(evaled), {code: "x1"})
    }catch(e){
        message.channel.send(`ERROR \n${clean(e)}`, {code: 'js'})
    }
}

module.exports.help = {
    "name": "eval",
    "desc": "Use js commands live",
    "use": undefined
}