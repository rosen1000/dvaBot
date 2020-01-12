const { getReaction } = require("../../models/image");
const { getMember } = require("../../models/common");

module.exports = {
    name: "pat",
    category: "reaction images",
    desc: "Pat your dominated ones... I mean your pets",
    use: "[mention]",
    run: async (bot, message, args) => {
        const embed = getReaction(this.name);
        const target = getMember(message, args[0]);
        if (target)
            embed.setDescription(`${target} now has inner piece`);
        else
            embed.setDescription(`Pati-py pat pat`);
        message.channel.send(embed);
    }
}