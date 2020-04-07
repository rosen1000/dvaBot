"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const memberSchema = mongoose_1.default.Schema({
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
}, {
    strict: false
});
module.exports = mongoose_1.default.model("member", memberSchema);
