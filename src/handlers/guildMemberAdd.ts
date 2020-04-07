import { BotClient } from "../models/BotClient";
import { TextChannel } from "discord.js";

const welcomejson = require("../welcomes.json");

module.exports = (bot: BotClient) => {
    bot.on("guildMemberAdd", async member => {
        //Eva's server
        if (member.guild.id == "514125758751440896") {
            let welcomeChannel = member.guild.channels.cache.find(
                ch => ch.id == "514125758751440900"
            );
            if (!welcomeChannel) return;

            let rulesChannel = member.guild.channels.cache.find(
                ch => ch.id == "519828142370586625"
            );
            let introductionChannel = member.guild.channels.cache.find(
                ch => ch.id == "604352341726199838"
            );
            console.log(
                welcomeChannel.guild.channels.cache.find(
                    ch => ch.id == "514125758751440900"
                )
            );
            (<TextChannel>welcomeChannel.guild.channels.cache.find(ch => ch.id == "514125758751440900"))
                    .send(
                        `Welcome ${member} Make sure to read and follow the ${rulesChannel} and introduce yourself in ${introductionChannel}. Have a great time!`
                    )
            return;
        }
        let memberrole = member.guild.roles.cache.find(
            r => r.name == "Members"
        );
        let botrole = member.guild.roles.cache.find(r => r.name == "BOTS");
        if (memberrole) {
            if (!member.user.bot) {
                await member.roles.add(memberrole.id);
            }
        }
        if (botrole) {
            if (member.user.bot) {
                await member.roles.add(botrole.id);
            }
        }

        let numMSG = Math.floor(Math.random() * 37) + 1;
        let wellcomemsg = welcomejson[numMSG];
        var sendMSG = wellcomemsg.replace("${member}", member);
        var welcomeChannel = <TextChannel>(
            member.guild.channels.cache.find(ch => ch.name == "welcome")
        );
        if (!welcomeChannel) return;
        welcomeChannel.send(sendMSG);
    });
};
