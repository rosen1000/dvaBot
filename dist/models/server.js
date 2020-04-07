"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const serverSchema = mongoose_1.default.Schema({
    id: String,
    prefix: {
        default: "?",
        type: String
    },
    coinType: {
        default: "dorito",
        type: String
    },
    coinName: {
        default: "Doritos",
        type: String
    },
    coinCustom: {
        default: false,
        type: Boolean
    },
    startingCoins: {
        default: 0,
        type: Number
    },
    dailyReward: {
        default: 100,
        type: Number
    },
    dailyStreakIncrease: {
        default: 50,
        type: Number
    },
    minCoinDrop: {
        default: 5,
        type: Number
    },
    maxCoinDrop: {
        default: 14,
        type: Number
    },
    disableCoinDropNotif: {
        default: false,
        type: Boolean
    },
    warnsEnabled: {
        default: true,
        type: Boolean
    }
}, {
    strict: false
});
module.exports = mongoose_1.default.model("server", serverSchema);
