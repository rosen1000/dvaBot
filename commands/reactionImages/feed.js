const { getReaction } = require("../../models/image");
const { getMember } = require("../../models/common");

module.exports = {
    name: "feed",
    category: "reaction images",
    desc: "Feed your hungry friends",
    use: "[mention]",
    enabled: true,
    run: async (bot, message, args) => {
        const embed = getReaction(this.name);
        const target = getMember(message, args[0]);
        if (target)
            embed.setDescription(`${target} you got fed with ${args[1] ? args[1] : "spaghetti"}`);
        else
            embed.setDescription(`${message.member} open wide! Ahhh~`);
        message.channel.send(embed);
    }
}