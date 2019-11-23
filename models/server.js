const mongoose = require("mongoose");
const serverSchema = mongoose.Schema({
    id: Number,
    prefix: String,
    coinType: "doritos",
    coinName: "doritos"
});

module.exports = mongoose.model("server", serverSchema);