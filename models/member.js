const mongoose = require("mongoose");
const memberSchema = mongoose.Schema({
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
},
{
    strict: false
});

module.exports = mongoose.model("member", memberSchema);