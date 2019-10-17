const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let mb = "MB";
    let uptime = bot.uptime/1000
    if(uptime <= 120){
        var format = "seconds"
    }else{
        uptime / 60;
        var format = "minutes"
    }
    let embed = new Discord.RichEmbed()
    .setTitle("Bot's statistics")
    .setColor(botconfig.color)
    .setDescription(`\`\`\`Mem use: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}` + mb
    +`\nUptime: ${Math.round(uptime)} ${format}`
    +`\nUsers: ${bot.users.size}`
    +`\nServers: ${bot.guilds.size}`
    +`\nChannels: ${bot.channels.size}\`\`\``);

    message.channel.send(embed);
}

module.exports.help = {
    name: "uptime",
    type: "meta",
    desc: "shows basic statistics for the bot (mem use,uptime,servers etc)",
    use: "?uptime"
}