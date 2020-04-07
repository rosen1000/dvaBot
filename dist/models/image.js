"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const discord_js_1 = require("discord.js");
const config_1 = require("../config");
module.exports = {
    getReaction: (name) => __awaiter(void 0, void 0, void 0, function* () {
        let img = yield axios_1.default
            .get("https://nekos.life/api/v2/img/" + name)
            .then(response => {
            return response.data.img;
        });
        const embed = new discord_js_1.MessageEmbed().setColor(config_1.config.color).setImage(img);
        return embed;
    })
};
