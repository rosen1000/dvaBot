import * as mongoose from "mongoose";
import { BotClient } from "./BotClient";
import { Message } from "discord.js";

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
    return bot.mongo.model("server", serverSchema);
}

export function createServer(bot: BotClient, message: Message) {
    let server = new bot.db.server({
        id: message.guild.id,
        coinType: "dorito",
        coinName: "Doritos",
        coinCustom: false,
        startingCoins: 0,
        dailyReward: 100,
        dailyStreakIncrease: 50,
        minCoinDrop: 5,
        maxCoinDrop: 14,
        disableCoinDropNotif: false,
        warnsEnabled: true,
    });
    server.save((e) => {
        if (e) throw e;
    });
    return server;
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
