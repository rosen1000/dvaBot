import { BotClient } from "../models/BotClient";
import { TextChannel, GuildMember } from "discord.js";
import { getWelcome } from "../functions/welcomes";

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
                await member.roles.add(memberrole);
            }
        }
        if (botrole) {
            if (member.user.bot) {
                await member.roles.add(botrole);
            }
        }

        var welcomeChannel = <TextChannel>(
            member.guild.channels.cache.find(ch => ch.name == "welcome")
        );
        if (!welcomeChannel) return;

        var sendMSG = getWelcome(<GuildMember>member);
        welcomeChannel.send(sendMSG);
    });
};
