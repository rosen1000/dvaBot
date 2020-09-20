const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

/**
 * @param {Discord.Client} bot 
 */
module.exports = (bot) => {
    fs.readdir(path.join(__dirname, "..", "commands"), (err, files) => {
        if (err) console.error(err);
    
        let jsfile = files.filter(f => f.split(".").pop() === 'js')
        if (jsfile.length <= 0) {
            console.warn("Couln't find commands.");
            return;
        }
    
        jsfile.forEach((f, i) => {
            let props = require(path.join(__dirname, `../commands/${f}`));
            console.log(`${f} loaded!`);
            bot.commands.set(props.help.name, props);
        });
    });
}
