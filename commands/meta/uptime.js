const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let mb = "MB";
    let uptime = bot.uptime / 1000;
    if (uptime <= 120) var format = "seconds";
    else uptime /= 60;
    var format = "minutes";

    let embed = new Discord.MessageEmbed()
        .setTitle("Bot's statistics")
        .setColor(botconfig.color)
        .setDescription(
            `\`\`\`Mem use: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
                2
            )}` +
                mb +
                `\nUptime: ${Math.round(uptime)} ${format}` +
                `\nUsers: ${bot.users.cache.size}` +
                `\nServers: ${bot.guilds.cache.size}` +
                `\nChannels: ${bot.channels.cache.size}\`\`\``
        );

    message.channel.send(embed);
};

module.exports.help = {
    name: "uptime",
    type: "meta",
    desc: "shows basic statistics for the bot (mem use,uptime,servers etc)",
    use: "uptime",
};
