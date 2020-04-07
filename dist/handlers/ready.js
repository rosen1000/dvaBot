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
const ms_1 = require("ms");
module.exports = (bot) => {
    bot.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`${bot.user.username} is online in ${bot.guilds.cache.size} servers ^^`);
        const statuses = require('../statuses.json');
        bot.user.setActivity("youtube", { type: "WATCHING" });
        setInterval(() => {
            let status;
            do {
                status = statuses[Math.floor(Math.random() * statuses.length)];
            } while (status.status == bot.user.presence.status);
            let regex = /\{{2}(.+)\}{2}/;
            let text;
            if (regex.test(status.status)) {
                text = status.status.replace(/\{{2}(.+)\}{2}/, function (match, p1) {
                    let [prop, key] = p1.split(".");
                    return bot[prop][key];
                });
            }
            else {
                text = status.status;
            }
            bot.user.setActivity(text, { type: status.type });
        }, ms_1.default("30m"));
    }));
};
