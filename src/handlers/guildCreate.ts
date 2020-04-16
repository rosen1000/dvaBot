import { BotClient } from "../models/BotClient";
import { TextChannel } from "discord.js";

module.exports = (bot: BotClient) => {
    bot.on("guildCreate", async (guild) => {
        let channel = <TextChannel>guild.channels.resolve("695248948193001492");
        if (!channel) return;
        channel.send(await timeout("Happy birthday to you", 2500));
        channel.send(await timeout("Happy birthday to you", 2500));
        channel.send(await timeout("Happy birthday dear Bee", 2500));
        channel.send(await timeout("Happy birthday...", 2500));
        channel.send(await timeout("NEZUKO-CHANNNNN", 2500));
    });
};

function timeout(text: string, time: number) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(text);
        }, time);
    });
}
