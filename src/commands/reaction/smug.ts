import { getMember } from "../../functions/common";
import { getReaction } from "../../functions/image";

module.exports = {
    name: "smug",
    category: "reaction",
    desc: "smug smug smug",
    use: "[mention]",
    enabled: true,
    run: async (bot, message, args) => {
        const embed = await getReaction("smug");
        const target = getMember(message, args[0]);
        if (target)
            embed.setDescription(`${message.member} smugged on ${target}`);
        else
            embed.setDescription(`😏😏😏`);
        message.channel.send(embed);
    }
}