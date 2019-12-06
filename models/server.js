const mongoose = require("mongoose");
const serverSchema = mongoose.Schema({
    id: Number,
    prefix: String,
    coinType: String,
    coinName: String
});

module.exports = mongoose.model("server", serverSchema);