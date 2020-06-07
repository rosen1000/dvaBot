const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const ms = require("ms");

/**
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (bot, message, args) => {
   let toMute =
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
         m =>
            m.user.username == args.join(" ") ||
            m == message.mentions.members.first()
      );
   if (!toMute) return message.reply("Couldn't find user.");
   if (toMute.permissions.has(botconfig.guild))
      return message.reply("How about you can't mute him!");
   let muterole = message.guild.roles.cache.find(r => r.name == "muted");
   //creating role
   if (!muterole) {
      if (!message.guild.me.permissions.has("MANAGE_ROLES")) return message.channel.send("I don't have permission to create the mute role :(");
      if (!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.channel.send("I can't apply the role to the channels");
      try {
         message.channel.send("This is the first time that command was used, keep in mind that for the command to work add the \"muted\" role to new channels")
         muterole = await message.guild.roles.create({
            data: {
               name: "muted",
               color: "BLACK",
               permission: []
            }
         });
         message.guild.channels.cache.forEach(async (channel) => {
            await channel.updateOverwrite(muterole, {
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

   await toMute.roles.add(muterole);
   message.reply(`${toMute} has been muted for ${ms(ms(mutetime))}`);

   setTimeout(() => {
      toMute.roles.remove(muterole);
      message.channel.send(`${toMute} has been unmuted!`);
   }, ms(mutetime));
};

module.exports.help = {
   name: "mute",
   type: "admin",
   desc: "Mutes user in case it spams or breaks the server rules",
   use: "?mute [user] [time]"
};
