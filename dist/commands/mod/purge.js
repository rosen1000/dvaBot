var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    name: "purge",
    aliases: ["clear"],
    type: "mod",
    desc: "Clears the chat from spam (must be less than 2 weeks ago)",
    use: "<number>",
    run: (bot, message, args) => __awaiter(this, void 0, void 0, function* () {
        if (!bot.member.hasPermission(require("../../botconfig.json").messages))
            return message.channel.send("Even *I* can't delete messages :(");
        if (!message.member.hasPermission(require("../../config.js").messages))
            return message.channel.send("Sorry, you can't delete messages!");
        let number = parseInt(args[0]);
        if (!number)
            return message.channel.send("How many should i delete tho");
        if (typeof number != "number")
            return message.channel.send("I don't see a number");
        message.delete();
        message.channel.bulkDelete(number)
            .then(message.channel.send(`Purged ${number} messages`)
            .then(m => m.delete(3500)))
            .catch(e => { if (e)
            message.channel.send("Error ocured!"); });
    })
};
