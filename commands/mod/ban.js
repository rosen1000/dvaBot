const { getMember } = require("../../models/common");

module.exports = {
    name: "ban",
    aliases: ["banish"],
    category: "mod",
    desc: "Ban a member for being too bad latly",
    use: "<username | id | mention> [reason]",
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("But you can't ban members .-.");
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Psst... Tell the admins that i can't ban...");
        if (!args[0]) return message.channel.send("Who should i ban again?");
        let member = getMember(message, args[0]);
        if (!member) message.channel.send("Who should i ban again?");

        if (message.author.id == member.id) return message.channel.send("There's a leave button 'ya know?");
        if (member.bannable) return message.channel.send("I can't ban him tho.. He is more powerfull than me");

        member.ban(args.slice(1).join(" ")).catch(e => {
            if (e) {
                console.log(e);
                return message.channel.send("Ok... I wasnt able to ban him?")
            }
        });
        message.channel.send("Done! " + member.user.username + " is done for");
    }
}