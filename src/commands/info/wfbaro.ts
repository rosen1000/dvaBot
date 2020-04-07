import * as Discord from "discord.js";
import axios from "axios";

module.exports = {
    name: "wfbaro",
    category: "info",
    desc: "Shows when Baro will come or what he sells",
    use: "",
    enabled: true,
    run: async (bot, message, args) => {
        axios.get("https://api.warframestat.us/pc").then(resolve => {
            
        })
    }
}