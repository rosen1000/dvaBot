const mongoose = require("mongoose");
const serverSchema = mongoose.Schema({
    prefix: String
});

module.exports = mongoose.model("server", serverSchema);