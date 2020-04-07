import { getMember } from "../../models/common";
import { getReaction } from "../../models/image";

module.exports = {
    name: "hug",
    category: "reaction",
    desc: "Hug someone who needs some love",
    use: "[mention]",
    enabled: true,
    run: async (bot, message, args) => {
        const embed = await getReaction("hug");
        const target = getMember(message, args[0]);
        if (target)
            embed.setDescription(`${message.member} hugged ${target}, aww they look cute`);
        else
            embed.setDescription(`${message.member} don't worry i'm here for you *hugs*`);
        message.channel.send(embed);
    }
}