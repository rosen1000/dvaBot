const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const bot = new Client({ disableEveryone: true });
bot.commands = new Collection();
bot.aliases = new Collection();
bot.categories = readdirSync("./commands/");
require("dotenv").config();

readdirSync("./handlers/").forEach(file => {
    require(__dirname + `/handlers/${file}`)(bot);
});

bot.login(process.env.TOKEN);