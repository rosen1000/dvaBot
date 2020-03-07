const mongoose = require("mongoose");
const serverSchema = mongoose.Schema({
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
    }
},
{
    strict: false
});

module.exports = mongoose.model("server", serverSchema);