import axios from "axios";
import { MessageEmbed } from "discord.js";
import { config } from "../config";

export async function getReaction(name: string): Promise<MessageEmbed> {
    let img = await axios
        .get("https://nekos.life/api/v2/img/" + name)
        .then((response) => {
            return response.data.img;
        });
    const embed = new MessageEmbed().setColor(config.color).setImage(img);
    return embed;
}
