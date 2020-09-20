const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
require("dotenv").config();
bot.commands = new Discord.Collection();

// Loading commands
require("./core/commandLoader")(bot);

// Call the events
require("./events/ready")(bot);
require("./events/message")(bot);
require("./events/guildMemberAdd")(bot);
require("./events/guildMemberRemove")(bot);

// Login
bot.login(process.env.TOKEN);
