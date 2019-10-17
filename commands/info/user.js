const { getMember, formatDate } = require("../../models/common");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
module.exports = {
    name: "user",
    aliases: ["who", "whois", "userinfo"],
    category: "info",
    desc: "Shows information about a user (not a member)",
    use: "[username || id || mention || default=author]",
    run: async (bot, messgage, args) => {
        const member = getMember(messgage, args.join(" "));

        const joinedAt = formatDate(member.joinedAt());
        const roles = member.roles
            .filter(r => r.id !== MessageChannel.guild.id)
            .map(r => r)
            .join(", ") || "none";
        const createdAt = formatDate(member.user.createdAt);
        
        let embed = new RichEmbed()
        .setFooter(member.displayName, member.user.displayAvatarURL)
        .setThumbnail(member.user.displayAvatarURL)
        .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
        .addField("Member information:", stripIndents`**> Display name: ** ${member.displayName}
        **> Joined at:** ${joinedAt}
        **> Roles:** ${roles}`, true)
        .addField("User information:", stripIndents`**> ID:** ${member.user.id}
        **> Username**: ${member.user.tag}
        **> Tag**: ${member.user.tag}
        **> Created at**: ${createdAt}`, true)
        .setTimestamp();
    
        if (member.user.presence.game) {
            embed.addField("Currently playing", stripIndents`**> Name**: ${member.user.presence.game.name}`);
        }

        messgage.channel.send(embed);
    }
}