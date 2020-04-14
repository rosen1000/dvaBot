import * as Discord from "discord.js";
import { getMember } from "../../functions/common";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";

module.exports = class Kick extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "kick",
            type: "mod",
            description: "Kicks a missbehiving member",
            usage: "<username || id || mention> [reason]",
            enabled: true,
        });
    }

    run(message: Discord.Message, args: string[]) {
        if (!message.member.hasPermission("KICK_MEMBERS"))
            return message.channel.send("But you can't kick members .-.");
        if (!message.guild.me.hasPermission("KICK_MEMBERS"))
            return message.channel.send(
                "Psst... Tell the admins that i can't kick..."
            );
        if (!args[0]) return message.channel.send("Who should i kick again?");
        let member = getMember(message, args);
        if (!member) message.channel.send("Who should i kick again?");

        if (message.author.id == member.id)
            return message.channel.send("There's a leave button 'ya know?");
        if (member.kickable)
            return message.channel.send(
                "I can't kick him tho.. He is more powerfull than me"
            );

        member.kick(args.slice(1).join(" ") || "Breaking rules").catch((e) => {
            if (e) {
                console.log(e);
                return message.channel.send("Ok... I wasnt able to kick him?");
            }
        });
        message.channel.send(
            "Done! " + member.user.username + " is gone for now"
        );

        let channel = <Discord.TextChannel>(
            message.guild.channels.cache.find((ch) => ch.name.includes("log"))
        );
        let embed = new Discord.MessageEmbed()
            .setTitle("<===Kick Report===>")
            .setColor(require("../../config.js").color)
            .addField("Kicked member", member.user.username, true)
            .addField("Kicked by", message.author, true)
            .addField("Kicked at", message.createdAt, true)
            .addField(
                "Reason",
                args.slice(1).join(" ") || "Breaking rules",
                true
            );
        if (channel) channel.send(embed);
    }
};
