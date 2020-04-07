var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { getMember, formatDate } = require("../../models/common");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
module.exports = {
    name: "user",
    aliases: ["who", "whois", "userinfo", "member", "memberinfo"],
    category: "info",
    desc: "Shows information about a user (not a member)",
    use: "[username | id | mention | default=author]",
    enabled: true,
    run: (bot, message, args) => __awaiter(this, void 0, void 0, function* () {
        const member = getMember(message, args.join(" ")) || message.member;
        const createdAt = formatDate(member.user.joinedTimestamp);
        const joinedAt = formatDate(member.joinedTimestamp);
        const roles = member.roles
            .filter(r => r.id !== message.channel.guild.id)
            .map(r => r)
            .join(", ") || "none";
        let embed = new RichEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
            .addField("Member information:", stripIndents `**> Nickname:** ${member.displayName}
            **> Joined at:** ${joinedAt}
            **> Roles:** ${roles}`, true)
            .addField("User information:", stripIndents `**> ID:** ${member.user.id}
            **> Username:** ${member.user.username}
            **> Tag:** ${member.user.tag}
            **> Created at:** ${createdAt}`, true)
            .setTimestamp();
        if (member.user.presence.game) {
            embed.addField("Currently playing", stripIndents `**> Name:** ${member.user.presence.game.name}`, true);
        }
        message.channel.send(embed);
    })
};
