import * as Discord from "discord.js";
import { getMember } from "../../functions/common";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";

module.exports = class Ban extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "ban",
            aliases: ["banish"],
            type: "mod",
            description: "Ban a member for being too bad lately",
            usage: "<username | id | mention> [reason]",
            enabled: true,
        });
    }
    run(message, args) {
        if (!message.member.hasPermission("BAN_MEMBERS"))
            return message.channel.send("But you can't ban members .-.");
        if (!message.guild.me.hasPermission("BAN_MEMBERS"))
            return message.channel.send(
                "Psst... Tell the admins that i can't ban..."
            );
        if (!args[0]) return message.channel.send("Who should i ban again?");
        let member = getMember(message, args);
        if (!member) message.channel.send("Who should i ban again?");

        if (message.author.id == member.id)
            return message.channel.send("There's a leave button 'ya know?");
        if (member.bannable)
            return message.channel.send(
                "I can't ban him tho.. He is more powerfull than me"
            );

        member.ban(args.slice(1).join(" ") || "Breaking rules").catch((e) => {
            if (e) {
                console.log(e);
                return message.channel.send("Ok... I wasnt able to ban him?");
            }
        });
        message.channel.send("Done! " + member.user.username + " is done for");

        let channel = message.guild.channel.find((ch) =>
            ch.name.includes("log")
        );
        let embed = new Discord.MessageEmbed()
            .setColor(require("../../config.json").color)
            .setTitle("<===Ban Report===>")
            .addField("Banned member", member.user.username, true)
            .addField("Banned by", message.author, true)
            .addField("Banned at", message.createdAt, true)
            .addField("Channel", message.channel, true)
            .addField(
                "Reason",
                args.slice(1).join(" ") || "Breaking rules",
                true
            );
        if (channel) channel.send(embed);
    }
};
