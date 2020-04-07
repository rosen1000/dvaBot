import { getMember, formatDate } from "../../models/common";
import { MessageEmbed } from "discord.js";
import { stripIndents } from "common-tags";

module.exports = {
    name: "user",
    aliases: ["who", "whois", "userinfo", "member", "memberinfo"],
    category: "info",
    desc: "Shows information about a user (not a member)",
    use: "[username | id | mention | default=author]",
    enabled: true,
    run: async (bot, message, args) => {
        const member = getMember(message, args.join(" ")) || message.member;
        const createdAt = formatDate(member.user.joinedTimestamp);
        const joinedAt = formatDate(member.joinedTimestamp);
        const roles = member.roles
            .filter(r => r.id !== message.channel.guild.id)
            .map(r => r)
            .join(", ") || "none";
        
        let embed = new MessageEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
            .addField("Member information:", stripIndents`**> Nickname:** ${member.displayName}
            **> Joined at:** ${joinedAt}
            **> Roles:** ${roles}`, true)
            .addField("User information:", stripIndents`**> ID:** ${member.user.id}
            **> Username:** ${member.user.username}
            **> Tag:** ${member.user.tag}
            **> Created at:** ${createdAt}`, true)
            .setTimestamp();
        if (member.user.presence.game) {
            embed.addField("Currently playing", stripIndents`**> Name:** ${member.user.presence.game.name}`, true);
        }

        message.channel.send(embed);
    }
}