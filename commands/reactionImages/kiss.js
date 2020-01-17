const { getReaction } = require("../../models/image");
const { getMember } = require("../../models/common");

module.exports = {
    name: "kiss",
    category: "reaction images",
    desc: "Kiss your favorite one",
    use: "[mention]",
    enabled: true,
    run: async (bot, message, args) => {
        const embed = getReaction(this.name);
        const target = getMember(message, args[0]);
        if (target)
            embed.setDescription(`${message.member} kissed ${target}`);
        else
            embed.setDescription(`${message.member} <.< *kisses you*`);
        message.channel.send(embed);
    }
}