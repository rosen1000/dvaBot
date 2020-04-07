import { getMember } from "../../models/common";
import { getReaction } from "../../models/image";

module.exports = {
    name: "slap",
    category: "reaction",
    desc: "Slap someone",
    use: "[mention]",
    enabled: true,
    run: async (bot, message, args) => {
        const embed = await getReaction("slap");
        const target = getMember(message, args[0]);
        if (target)
            embed.setDescription(`${target} SLAPP`);
        else
            embed.setDescription(`${message.member} think straight!`);
        message.channel.send(embed);
    }
}