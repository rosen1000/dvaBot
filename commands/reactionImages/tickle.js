const { getReaction } = require("../../models/image");
const { getMember } = require("../../models/common");

module.exports = {
    name: "tickle",
    category: "reaction images",
    desc: "Tickle someone",
    use: "[mention]",
    enabled: true,
    run: async (bot, message, args) => {
        const embed = await getReaction(this.name);
        const target = getMember(message, args[0]);
        if (target)
            embed.setDescription(`${message.member} tickled ${target}, they can't control themselfs!`);
        else
            embed.setDescription(``);
        message.channel.send(embed);
    }
}