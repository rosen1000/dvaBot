import * as mongoose from "mongoose";
import { BotClient } from "./BotClient";

interface MemberInterface extends mongoose.Document {
    userID: string;
    guildID: string
    coins: number
    level: number
    xp: number
    marry: string
    notifyCoinDrop: boolean
    seenCoinDropHint: boolean
    warns: number
}

export function getMemberDB(bot: BotClient) {
    let Member = bot.mongo.model("member", memberSchema);
    return Member;
}

const memberSchema = new mongoose.Schema({
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
