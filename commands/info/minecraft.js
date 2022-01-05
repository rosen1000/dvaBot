const Discord = require("discord.js");
const axios = require("axios").default;

/**
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (bot, message, args) => {
    axios.get(`https://api.mcsrvstat.us/2/${args[0]}`).then((response) => {
        let server = response.data;
        if (!server.online) {
            return message.channel.send("Server is offline!");
        }
        console.log(server);
        const embed = new Discord.MessageEmbed()
            .setTitle(server.hostname ? server.hostname : server.ip)
            .setColor("GREEN");
        if (server.icon) embed.setThumbnail(`https://api.mcsrvstat.us/icon/${server.ip}`);
        if (server.players)
            embed.addField(
                "Players",
                `${server.players.online}/${server.players.max}`,
                true
            );
        if (server.motd)
            embed.addField(
                "MOTD",
                server.motd.clean.map((l) => l),
                true
            );
        if (server.version) embed.addField("Version", server.version, true);
        if (server.software) {
            embed.addField("Software", server.software, true);
            if (server.plugins) {
                embed.addField("Plugins", server.plugins.names.length, true);
            }
            if (server.mods) {
                embed.addField("Mods", server.plugins.names.length, true);
            }
        }
        message.channel.send(embed);
    });
};

module.exports.help = {
    name: "minecraft",
    type: "info",
    desc: "Shows info about minecraft servers",
    use: "minecraft <ip/hostname>",
};
