const mongoose = require("mongoose");
const serverSchema = mongoose.Schema({
    id: String,
    prefix: {
        default: "?",
        type: String
    },
    coinType: {
        default: "dorito",
        type: String
    },
    coinName: {
        default: "Doritos",
        type: String
    },
    coinCustom: {
        default: false,
        type: Boolean
    }
},
{
    strict: false
});

module.exports = mongoose.model("server", serverSchema);