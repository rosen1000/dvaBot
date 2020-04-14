import * as Discord from "discord.js";
import axios from "axios";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";

module.exports = class Wfbaro extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "wfbaro",
            type: "info",
            description: "Shows when Baro will come or what he sells",
            usage: "",
            enabled: false,
        });
    }
    run(message: Discord.Message, args: string[]) {
        axios.get("https://api.warframestat.us/pc").then((resolve) => {});
    }
};
