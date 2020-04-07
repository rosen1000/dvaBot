import { getMember } from "../../functions/common";
import { getReaction } from "../../functions/image";

module.exports = {
    name: "poke",
    category: "reaction",
    desc: "Poke someone to wake up",
    use: "[mention]",
    enabled: true,
    run: async (bot, message, args) => {
        const embed = await getReaction("pat");
        const target = getMember(message, args[0]);
        if (target)
            embed.setDescription(`${target}, you got poked`);
        else
            embed.setDescription(`wake me up WAKE ME UP INSIDE`);
        message.channel.send(embed);
    }
}