const { getReaction } = require("../../models/image");
const { getMember } = require("../../models/common");

module.exports = {
    name: "slap",
    category: "reaction images",
    desc: "Slap someone",
    use: "[mention]",
    enabled: true,
    run: async (bot, message, args) => {
        const embed = getReaction(this.name);
        const target = getMember(message, args[0]);
        if (target)
            embed.setDescription(`${target} SLAPP`);
        else
            embed.setDescription(`${message.member} think straight!`);
        message.channel.send(embed);
    }
}