const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!toMute) return message.reply("Couldn't find user.");
    if (toMute.hasPermission(botconfig.guild)) return message.reply("How about you can't mute him!");
    let muterole = message.guild.roles.find(`name`, "muted");
    //creating role
    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: 'muted',
                color: botconfig.black,
                permission: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }
    //end creating role
    let mutetime = args[1];
    if (!mutetime) return message.reply("You didn't specify a time!");

    await (toMute.addRole(muterole.id));
    message.reply(`<@${toMute.id}> has been muted for ${ms(ms(mutetime))}`);

    setTimeout(function () {
        toMute.removeRole(muterole.id);
        message.channel.send(`${toMute} has been unmuted!`);
    }, ms(mutetime));
}

module.exports.help = {
    name: "mute",
    type: "admin",
    desc: "Mutes user in case it spams or breaks the server rules",
    use: "?mute [user] [time]"
}