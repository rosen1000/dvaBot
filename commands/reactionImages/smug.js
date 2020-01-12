const { getReaction } = require("../../models/image");
const { getMember } = require("../../models/common");

module.exports = {
    name: "smug",
    category: "reaction images",
    desc: "smug smug smug",
    use: "[mention]",
    run: async (bot, message, args) => {
        const embed = getReaction(this.name);
        const target = getMember(message, args[0]);
        if (target)
            embed.setDescription(`${message.member} smugged on ${target}`);
        else
            embed.setDescription(`😏😏😏`);
        message.channel.send(embed);
    }
}