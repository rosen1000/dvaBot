const mongoose = require("mongoose");
// DEPRECATED: will be removed in near future!
const memberSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    money: Number,
    level: Number,
    xp: Number
});

module.exports = mongoose.model("member", memberSchema);