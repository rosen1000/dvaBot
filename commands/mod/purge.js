module.exports = {
    name: "purge",
    aliases: ["clear"],
    type: "mod",
    desc: "Clears the chat from spam (must be less than 2 weeks ago)",
    use: "<number>",
    run: async (bot, message, args) => {
        if (!bot.member.hasPermission(require("../../botconfig.json").messages))
            return message.channel.send("Even *I* can't delete messages :(");
        if (!message.member.hasPermission(require("../../botconfig.json").messages))
            return message.channel.send("Sorry, you can't delete messages!");
        
        let number = parseInt(args[0]);
        if (!number) return message.channel.send("How many should i delete tho");
        if (typeof number != "number") return message.channel.send("I don't see a number");

        message.delete();
        message.channel.bulkDelete(number)
            .then(message.channel.send(`Purged ${number} messages`)
            .then(m => m.delete(3500)))
            .catch(e => { if (e) message.channel.send("Error ocured!") });
    }
}