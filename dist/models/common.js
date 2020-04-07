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
module.exports = {
    getMember(message, id) {
        let target;
        if (id) {
            id = id.toLowerCase();
            target = message.guild.members.cache.get(id);
        }
        if (!target && message.mentions.members) {
            target = message.mentions.members.first();
        }
        else if (!target && id) {
            target = message.guild.members.cache.find(m => {
                return (m.displayName.toLowerCase().includes(id) ||
                    m.user.tag.toLowerCase().includes(id));
            });
        }
        return target;
    },
    formatDate: (date) => {
        let options = {
            dateStyle: "short",
            timeZone: "Europe/Sofia"
        };
        return new Intl.DateTimeFormat("en-GB", options).format(date);
    },
    promptMessage: (message, author, time, validReactions) => __awaiter(void 0, void 0, void 0, function* () {
        time *= 1000;
        for (let re of validReactions)
            yield message.react(re);
        const filter = (re, u) => validReactions.includes(re.emoji.name) &&
            author.id === message.author.id;
        return message
            .awaitReactions(filter, { max: 1, time: time })
            .then(coll => coll.first() && coll.first().emoji.name);
    })
};
