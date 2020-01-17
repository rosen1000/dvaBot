const { getReaction } = require("../../models/image");
const { getMember } = require("../../models/common");

module.exports = {
    name: "poke",
    category: "reaction images",
    desc: "Poke someone to wake up",
    use: "[mention]",
    enabled: true,
    run: async (bot, message, args) => {
        const embed = getReaction(this.name);
        const target = getMember(message, args[0]);
        if (target)
            embed.setDescription(`${target}, you got poked`);
        else
            embed.setDescription(`wake me up WAKE ME UP INSIDE`);
        message.channel.send(embed);
    }
}