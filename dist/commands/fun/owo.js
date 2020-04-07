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
    name: "owo",
    category: "fun",
    desc: "OwOifies text",
    use: "<text>",
    enabled: true,
    run: (bot, message, args) => __awaiter(this, void 0, void 0, function* () {
        axios.get("https://nekos.life/api/v2/owoify?text=" + encodeURI(args.join(" "))).then(response => {
            if (response.data.msg)
                message.channel.send(response.data.msg);
            else
                message.channel.send(response.data.owo);
        });
    })
};
