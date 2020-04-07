import ms from "ms";
import { BotClient } from "../models/BotClient";

module.exports = (bot: BotClient) => {
    bot.on("ready", async () => {
        console.log(`${bot.user.username} is online in ${bot.guilds.cache.size} servers ^^`);

        const statuses = require('../statuses.json');
        bot.user.setActivity("youtube", { type: "WATCHING" });

        setInterval(() => {
            let status;
            do {
                status = statuses[Math.floor(Math.random() * statuses.length)];
            } while (status.status == bot.user.presence.status); 
            let regex = /\{{2}(.+)\}{2}/;
            let text;
            if (regex.test(status.status)) {
                text = status.status.replace(/\{{2}(.+)\}{2}/, function (match, p1) {
                    let [prop, key] = p1.split(".");
                    return bot[prop][key];
                });
            } else {
                text = status.status;
            }
            bot.user.setActivity(text, { type: status.type });
        }, ms("30m"));
    });
}