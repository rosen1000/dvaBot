import { BotClient } from "../models/BotClient";
import { ActivityType } from "discord.js";

class Status {
    status: string;
    type: ActivityType;
}

export function getStatus(bot: BotClient): Status {
    let status = new Status();
    let statuses = [
        {
            status: `in ${bot.guilds.cache.size} servers`,
            type: "PLAYING",
        },
        {
            status: "youtube",
            type: "WATCHING",
        },
        {
            status: "Overwatch",
            type: "PLAYING",
        },
        {
            status: "good music",
            type: "LISTENING",
        },
        {
            status: "with big goth anime tiddies",
            type: "PLAYING",
        },
        {
            status: "t̑͜͞h̾͑ͫe͋̌̆ ̵͚̿v̆̌̂oͣͤ́ḯ͌̈́d̆ͯͬ",
            type: "LISTENING",
        },
        {
            status: "大きなお世話",
            type: "PLAYING",
        },
    ];
    status.status = statuses[Math.floor(Math.random() * statuses.length)][0];
    status.type = statuses[Math.floor(Math.random() * statuses.length)][1];
    return status;
}
