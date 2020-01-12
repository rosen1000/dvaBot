const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
});
module.exports = mongoose;