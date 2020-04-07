import mongoose from "mongoose";
require("dotenv").config();
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
module.exports = mongoose;
