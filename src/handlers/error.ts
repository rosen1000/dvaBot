import { BotClient } from "../models/BotClient";
import chalk = require("chalk");

module.exports = (bot: BotClient) => {
    bot.on("error", (error) => {
        console.log(chalk.red("[ERROR] " + error.name) + ": " + error.message);
    });
};
