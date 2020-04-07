var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { RichEmbed } = require("discord.js");
module.exports = {
    name: "feedback",
    type: "info",
    desc: "Send feedback to the bot owner",
    use: "<text>",
    run: (bot, message, args) => __awaiter(this, void 0, void 0, function* () {
        if (!args[0])
            return message.channel.send("Please tell me something");
        let feedback = args.join(" ");
        let embed = new RichEmbed()
            .setColor(require("../../config.js").color)
            .setAuthor(message.author.tag)
            .setThumbnail(message.author.displayAvatarURL)
            .addField("Feedback:", feedback)
            .setFooter("In server: " + message.guild.name);
        bot.users.get("353464955217117185").send(embed);
        message.channel.send("👍");
    })
};
