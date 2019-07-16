const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    marry: String,
    money: Number,
    level: Number,
    xp: Number
})

module.exports = mongoose.model("user", userSchema);