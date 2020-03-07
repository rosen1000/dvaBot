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
    }
},
{
    strict: false
});

module.exports = mongoose.model("member", memberSchema);