"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = mongoose_1.default.Schema({
    userID: String
});
module.exports = mongoose_1.default.model("user", userSchema);
