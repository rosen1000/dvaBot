import { getMember, formatDate } from "../../functions/common";
import { MessageEmbed, Message } from "discord.js";
import { stripIndents } from "common-tags";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";

module.exports = class User extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "user",
            aliases: ["who", "whois", "userinfo", "member", "memberinfo"],
            type: "info",
            description: "Shows information about a user (not a member)",
            usage: "[username | id | mention | default=author]",
            enabled: true,
        });
    }
    run(message: Message, args: string[]) {
        const member = getMember(message, args) ?? message.member;
        const createdAt = formatDate(member.user.createdAt);
        const joinedAt = formatDate(member.joinedAt);
        const roles = member.roles.cache.map((r) => r).join(", ") || "none";

        let embed = new MessageEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL())
            .setThumbnail(member.user.displayAvatarURL())
            .setColor(
                member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor
            )
            .addField(
                "Member information:",
                stripIndents`**> Nickname:** ${member.nickname || "none"}
            **> Joined at:** ${joinedAt}
            **> Roles:** ${roles}`,
                true
            )
            .addField(
                "User information:",
                stripIndents`**> ID:** ${member.user.id}
            **> Username:** ${member.user.username}
            **> Tag:** ${member.user.tag}
            **> Created at:** ${createdAt}`,
                true
            )
            .setTimestamp();
        if (member.user.presence.activities.length != 0) {
            embed.addField(
                "Currently playing",
                stripIndents`**> Name:** ${member.user.presence.activities[0].name}`,
                true
            );
        }

        message.channel.send(embed);
    }
};
