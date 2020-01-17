const { getReaction } = require("../../models/image");
const { getMember } = require("../../models/common");

module.exports = {
    name: "cuddle",
    category: "reaction images",
    desc: "Cuddle someone uwu",
    use: "[mention]",
    enabled: true,
    run: async (bot, message, args) => {
        const embed = await getReaction(this.name);
        const target = getMember(message, args[0]);
        if (target)
            embed.setDescription(`${target} you have been cuddled uwu`);
        else
            embed.setDescription(`${message.member} worry not, i'll cuddle you`);
        message.channel.send(embed);
    }
}