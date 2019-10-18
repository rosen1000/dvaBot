const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const bot = new Client({ disableEveryone: true });
bot.commands = new Collection();
bot.aliases = new Collection();
bot.categories = readdirSync("./commands/");
require("dotenv").config();

["ready", "guildMemberAdd", "guildMemberRemove", "command"].forEach(handler => {
    require(__dirname + `/handlers/${handler}.js`)(bot);
});

bot.login(process.env.TOKEN);