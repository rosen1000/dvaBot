import { getMember } from "../../models/common";
import { getReaction } from "../../models/image";

module.exports = {
    name: "feed",
    category: "reaction",
    desc: "Feed your hungry friends",
    use: "[mention]",
    enabled: true,
    run: async (bot, message, args) => {
        const embed = await getReaction("feed");
        const target = getMember(message, args[0]);
        if (target)
            embed.setDescription(`${target} you got fed with ${args[1] ? args[1] : "spaghetti"}`);
        else
            embed.setDescription(`${message.member} open wide! Ahhh~`);
        message.channel.send(embed);
    }
}