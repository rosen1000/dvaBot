import ms from "ms";
import { BotClient } from "../models/BotClient";
import { getStatus } from "../functions/statuses";

module.exports = (bot: BotClient) => {
    bot.on("ready", async () => {
        console.log(`${bot.user.username} is online in ${bot.guilds.cache.size} servers ^^`);
        bot.user.setActivity("youtube", { type: "WATCHING" });

        setInterval(() => {
            let status = getStatus(bot);
            bot.user.setActivity(status.status, { type: status.type });
        }, parseInt(ms("30m").toString()));
    });
};
