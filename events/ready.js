const Discord = require("discord.js");
const ms = require("ms");

/**
 * @param {Discord.Client} bot
 */
module.exports = (bot) => {
    bot.once("ready", async () => {
        console.log(`${bot.user.username} is online in ${bot.guilds.cache.size} servers ^^`);

        // Load statuses and set a default one
        const statuses = require("../statuses.json");
        bot.user.setActivity("youtube", { type: "WATCHING" });

        setInterval(() => {
            let status,
                text,
                regex = /\{{2}(.+)\}{2}/;

            // Never have the same status twice in a row
            do status = statuses[Math.floor(Math.random() * statuses.length)];
            while (status.status == bot.user.presence.status);

            // Check if the status needs to be filled with a variable
            if (regex.test(status.status)) {
                text = status.status.replace(/\{{2}(.+)\}{2}/, function (match, p1) {
                    let props = p1.split(".");
                    if (props.length == 2) {
                        let [prop, key] = p1.split(".");
                        return bot[prop][key];
                    } else if (props.length == 3) {
                        let [prop, key1, key2] = p1.split(".");
                        return bot[prop][key1][key2];
                    }
                });
            } else text = status.status;

            bot.user.setActivity(text, { type: status.type });
        }, ms("30m"));
    });
};
