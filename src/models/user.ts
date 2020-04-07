import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    userID: String
});
module.exports = mongoose.model("user", userSchema);
