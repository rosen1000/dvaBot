const Discord = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "wfbaro",
    category: "info",
    desc: "Shows when Baro will come or what he sells",
    use: "",
    run: async (bot, message, args) => {
        axios.get("https://api.warframestat.us/pc").then(resolve => {
            
        })
    }
}