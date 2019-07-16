const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("You can't control the roles");
  let rMember = message.mentions.users.first();
  if(!rMember) return message.reply("Cant find him, go find him");
  let role = args.slice(1).join(" ");
  if(!role) return message.reply("gimme role!");

  let gRole = message.guild.roles.find(r => r.name == role);
  if(!gRole) return message.reply("i cant find that role ;-;")
  if(rMember.roles.has(gRole.id)) return message.send("he has the role already!");
  await(rMember.addRole(gRole.id));

  try{
    await rMember.send(`now you have ${gRole.name}`)
  }catch(e){
    message.channel.send(`<@${rUser}> now you have ${gRole.name}. Tried to DM [shrug]`)
  }
}

module.exports.help = {
  name: "addrole",
  desc: "gives someone an role (under development)",
  use: "?addrole [user] [role]"
}