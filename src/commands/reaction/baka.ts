import { getMember } from "../../functions/common";
import { getReaction } from "../../functions/image";

module.exports = {
    name: "baka",
    category: "reaction",
    desc: "Baka someone! Let them know how foolish they are!",
    use: "[mention]",
    enabled: true,
    run: async (bot, message, args) => {
        const embed = await getReaction("baka");
        const target = getMember(message, args[0]);
        if (target)
            embed.setDescription(`${target} you just got :b:aKa'd! HA!`);
        else
            embed.setDescription(`b-baka!`);
        message.channel.send(embed);
    }
}