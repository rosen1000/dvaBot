const axios = require("axios");
const { RichEmbed } = require("discord.js");

module.exports = {
    getReaction: async (name) => {
        let img = await axios.get("https://nekos.life/api/v2/img/" + name).then(response => {
            return response.data.img;
        });
        const embed = new RichEmbed()
            .setColor(require("../botconfig.json").color)
            .setImage(img);
        return embed;
    }
}