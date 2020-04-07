import { getMember } from "../../models/common";
import { getReaction } from "../../models/image";

module.exports = {
    name: "tickle",
    category: "reaction",
    desc: "Tickle someone",
    use: "[mention]",
    enabled: true,
    run: async (bot, message, args) => {
        const embed = await getReaction("tickle");
        const target = getMember(message, args[0]);
        if (target)
            embed.setDescription(`${message.member} tickled ${target}, they can't control themselfs!`);
        else
            embed.setDescription(`*tickle tickle*`);
        message.channel.send(embed);
    }
}