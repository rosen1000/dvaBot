const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("NOPE");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members(args[0]);
  if(!rMember) return message.reply("Cant find him, go find him");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("gimme role!");
  let gRole = message.guild.roles.find("`name`, 'TESTER'");

  if(!rMember.roles.has(gRole.id)) return message.reply("he dont have the role");
  await(rMember.removeRole(gRole.id));

  try{
    await rMember.send(`now you dont have ${gRole.name}`)
  }catch(e){
    message.channel.send(`<@${rUser}> now you dont have ${gRole.name}. Tried to DM [shrug]`)
  }
}

module.exports.help = {
    name: "removerole",
    desc: "Removes role from someone",
    use: "?removerole [user] [role]"
}
