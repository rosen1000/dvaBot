import * as mongoose from "mongoose";
import { BotClient } from "./BotClient";

interface ServerInterface extends mongoose.Document {
    id: string;
    coinType: string;
    coinName: string;
    coinCustom: boolean;
    startingCoins: number;
    dailyReward: number;
    dailyStreakIncrease: number;
    minCoinDrop: number;
    maxCoinDrop: number;
    disableCoinDropNotif: false;
    warnsEnabled: boolean;
}

export function getServerDB(bot: BotClient) {
    const Server = bot.mongo.model("server", serverSchema);
    return Server;
}

const serverSchema = new mongoose.Schema({
    id: String,
    prefix: {
        default: "?",
        type: String,
    },
    coinType: {
        default: "dorito",
        type: String,
    },
    coinName: {
        default: "Doritos",
        type: String,
    },
    coinCustom: {
        default: false,
        type: Boolean,
    },
    startingCoins: {
        default: 0,
        type: Number,
    },
    dailyReward: {
        default: 100,
        type: Number,
    },
    dailyStreakIncrease: {
        default: 50,
        type: Number,
    },
    minCoinDrop: {
        default: 5,
        type: Number,
    },
    maxCoinDrop: {
        default: 14,
        type: Number,
    },
    disableCoinDropNotif: {
        default: false,
        type: Boolean,
    },
    warnsEnabled: {
        default: true,
        type: Boolean,
    },
});
