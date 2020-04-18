import * as mongoose from "mongoose";
import { BotClient } from "./BotClient";
import { Message } from "discord.js";

export interface MemberInterface extends mongoose.Document {
    userID: string;
    guildID: string;
    coins: number;
    level: number;
    xp: number;
    marry?: string;
    notifyCoinDrop: boolean;
    seenCoinDropHint: boolean;
    warns: number;
}

export function getMemberDB(bot: BotClient) {
    return bot.mongo.model("member", memberSchema);
}

export function createMember(bot: BotClient, userID: string, guildID: string) {
    let member = new bot.db.member({
        userID,
        guildID,
        coins: 0,
        level: 0,
        xp: 0,
        marry: null,
        notifyCoinDrop: true,
        seenCoinDropHint: false,
        warns: 0,
    });
    member.save((e) => {
        if (e) throw e;
    });
    return member;
}

export const memberSchema = new mongoose.Schema({
    userID: {
        type: String,
        unique: true
    },
    guildID: {
        type: String,
        unique: true
    },
    coins: Number,
    level: Number,
    xp: Number,
    marry: String,
    notifyCoinDrop: {
        default: true,
        type: Boolean,
    },
    seenCoinDropHint: {
        default: false,
        type: Boolean,
    },
    warns: {
        default: 0,
        type: Number,
    },
}, {
    strict: true
});
