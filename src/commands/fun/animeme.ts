import * as Discord from "discord.js";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";
import axios from "axios";

module.exports = class Animeme extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "animeme",
            aliases: ["animemes"],
            type: "fun",
            description: "Posts random meme from r/animemes",
            usage: "animeme",
            enabled: true,
        });
    }
    async run(message: Discord.Message, args: string[]) {
        const { data } = await axios.get("https://reddit.com/r/animemes/hot.json", {
            headers: { limit: 500 },
        });
        const animeme = data.data.children;
        let meme = animeme[Math.round(Math.random() * animeme.length)].data; // TODO: sometimes cannot read data from undefined
        const embed = new Discord.MessageEmbed()
            .setColor(this.bot.config.color)
            .setTitle("Animeme!")
            .setTitle(meme.title)
            .setURL(meme.url)
            .setImage(meme.url)
            .setFooter("Animemes by /r/animemes");
        message.channel.send(embed);
    }
};
