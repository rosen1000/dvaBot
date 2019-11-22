const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    userID: String,
    globalXP: Number,
    globalLevel: Number,
    marry: String
});
module.exports = mongoose.model("user", userSchema);