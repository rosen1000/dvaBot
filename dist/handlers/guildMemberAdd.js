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
const welcomejson = require("../welcomes.json");
module.exports = (bot) => {
    bot.on("guildMemberAdd", (member) => __awaiter(void 0, void 0, void 0, function* () {
        if (member.guild.id == "514125758751440896") {
            let welcomeChannel = member.guild.channels.cache.find(ch => ch.id == "514125758751440900");
            if (!welcomeChannel)
                return;
            let rulesChannel = member.guild.channels.cache.find(ch => ch.id == "519828142370586625");
            let introductionChannel = member.guild.channels.cache.find(ch => ch.id == "604352341726199838");
            console.log(welcomeChannel.guild.channels.cache.find(ch => ch.id == "514125758751440900"));
            welcomeChannel.guild.channels.cache.find(ch => ch.id == "514125758751440900")
                .send(`Welcome ${member} Make sure to read and follow the ${rulesChannel} and introduce yourself in ${introductionChannel}. Have a great time!`);
            return;
        }
        let memberrole = member.guild.roles.cache.find(r => r.name == "Members");
        let botrole = member.guild.roles.cache.find(r => r.name == "BOTS");
        if (memberrole) {
            if (!member.user.bot) {
                yield member.roles.add(memberrole.id);
            }
        }
        if (botrole) {
            if (member.user.bot) {
                yield member.roles.add(botrole.id);
            }
        }
        let numMSG = Math.floor(Math.random() * 37) + 1;
        let wellcomemsg = welcomejson[numMSG];
        var sendMSG = wellcomemsg.replace("${member}", member);
        var welcomeChannel = (member.guild.channels.cache.find(ch => ch.name == "welcome"));
        if (!welcomeChannel)
            return;
        welcomeChannel.send(sendMSG);
    }));
};
