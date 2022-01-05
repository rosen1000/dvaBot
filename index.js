const Discord = require('discord.js');
const FLAGS = Discord.Intents.FLAGS;
const bot = new Discord.Client({ intents: [FLAGS.GUILDS, FLAGS.GUILD_MESSAGES] });
require('dotenv').config();
bot.commands = new Discord.Collection();
const { loadDirectory } = require('./core/utils');

// Loading commands
require('./core/commandLoader')(bot);

// Call the events
loadDirectory('./events', bot);

// Login
bot.login(process.argv.includes('--dev') ? process.env.DEV : process.env.TOKEN);
