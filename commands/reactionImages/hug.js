const { getReaction } = require("../../models/image");
const { getMember } = require("../../models/common");

module.exports = {
    name: "hug",
    category: "reaction images",
    desc: "Hug someone who needs some love",
    use: "[mention]",
    run: async (bot, message, args) => {
        const embed = getReaction(this.name);
        const target = getMember(message, args[0]);
        if (target)
            embed.setDescription(`${message.member} hugged ${target}, aww they look cute`);
        else
            embed.setDescription(`${message.member} don't worry i'm here for you *hugs*`);
        message.channel.send(embed);
    }
}