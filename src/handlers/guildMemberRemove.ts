import { BotClient } from "../models/BotClient";
import { TextChannel } from "discord.js";

module.exports = (bot: BotClient) => {
    bot.on("guildMemberRemove", async (member) => {
        let welcomeChannel = (<TextChannel>member.guild.channels.cache.find(ch => ch.name == "welcome"));
        if (welcomeChannel) welcomeChannel.send(`${member.user.username} has departed to Auir!`);
    });
}