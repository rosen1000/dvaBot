const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({ disableEveryone: true });
const Logger = require("logdna");
require("dotenv").config();
bot.commands = new Discord.Collection();
bot.logger = Logger.createLogger(process.env.logdna, {app: "dva-bot"});

// Loading commands
fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);

    let jsfile = files.filter(f => f.split(".").pop() === 'js')
    if (jsfile.length <= 0) {
        console.warn("Couln't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

// Call the events
require("./events/ready")(bot);
require("./events/message")(bot);
require("./events/guildMemberAdd")(bot);
require("./events/guildMemberRemove")(bot);

bot.login(process.env.TOKEN);
