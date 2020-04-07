import { getMember } from "../../models/common";
import { getReaction } from "../../models/image";

module.exports = {
    name: "pat",
    category: "reaction",
    desc: "Pat your dominated ones... I mean your pets",
    use: "[mention]",
    enabled: true,
    run: async (bot, message, args) => {
        const embed = await getReaction("pat");
        const target = getMember(message, args[0]);
        if (target)
            embed.setDescription(`${target} now has inner piece`);
        else
            embed.setDescription(`Pati-py pat pat`);
        message.channel.send(embed);
    }
}