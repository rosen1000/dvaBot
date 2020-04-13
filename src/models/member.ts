import * as mongoose from "mongoose";
import { BotClient } from "./BotClient";
import { Message } from "discord.js";

export interface MemberInterface extends mongoose.Document {
    userID: string;
    guildID: string
    coins: number
    level: number
    xp: number
    marry?: string
    notifyCoinDrop: boolean
    seenCoinDropHint: boolean
    warns: number
}

export function getMemberDB(bot: BotClient) {
    let Member = bot.mongo.model("member", memberSchema);
    return Member;
}

export function createMember(message: Message): MemberInterface {
    return <MemberInterface>{
        userID: message.author.id,
        guildID: message.guild.id,
        coins: 0,
        level: 0,
        xp: 0,
        marry: null,
        notifyCoinDrop: true,
        seenCoinDropHint: false,
        warns: 0
    }
}

export const memberSchema = new mongoose.Schema({
    userID: String,
    guildID: String,
    coins: Number,
    level: Number,
    xp: Number,
    marry: String,
    notifyCoinDrop: {
        default: true,
        type: Boolean
    },
    seenCoinDropHint: {
        default: false,
        type: Boolean
    },
    warns: {
        default: 0,
        type: Number
    }
});
