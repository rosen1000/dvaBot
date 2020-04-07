var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Discord = require("discord.js");
const axios = require("axios");
module.exports = {
    name: "wfbaro",
    category: "info",
    desc: "Shows when Baro will come or what he sells",
    use: "",
    enabled: true,
    run: (bot, message, args) => __awaiter(this, void 0, void 0, function* () {
        axios.get("https://api.warframestat.us/pc").then(resolve => {
        });
    })
};
