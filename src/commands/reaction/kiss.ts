import { getMember } from "../../models/common";
import { getReaction } from "../../models/image";

module.exports = {
    name: "kiss",
    category: "reaction",
    desc: "Kiss your favorite one",
    use: "[mention]",
    enabled: true,
    run: async (bot, message, args) => {
        const embed = await getReaction("kiss");
        const target = getMember(message, args[0]);
        if (target)
            embed.setDescription(`${message.member} kissed ${target}`);
        else
            embed.setDescription(`${message.member} <.< *kisses you*`);
        message.channel.send(embed);
    }
}