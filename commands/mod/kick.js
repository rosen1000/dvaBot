const { getMember } = require("../../models/common");

module.exports = {
    name: "kick",
    category: "mod",
    desc: "Kicks a missbehiving member",
    usage: "<username || id || mention> [reason]",
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("But you can't kick members .-.");
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("Psst... Tell the admins that i can't kick...");
        if (!args[0]) return message.channel.send("Who should i kick again?");
        let member = getMember(message, args[0]);
        if (!member) message.channel.send("Who should i kick again?");

        if (message.author.id == member.id) return message.channel.send("There's a leave button 'ya know?");
        if (member.kickable) return message.channel.send("I can't kick him tho.. He is more powerfull than me");
        
        member.kick(args.slice(1).join(" ")).catch(e => {
            if (e) {
                console.log(e);
                return message.channel.send("Ok... I wasnt able to kick him?")
            }
        });
        message.channel.send("Done! " + member.user.username + " is gone for now");
    }
}