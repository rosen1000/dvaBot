var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { getReaction } = require("../../models/image");
const { getMember } = require("../../models/common");
module.exports = {
    name: "kiss",
    category: "reaction images",
    desc: "Kiss your favorite one",
    use: "[mention]",
    enabled: true,
    run: (bot, message, args) => __awaiter(this, void 0, void 0, function* () {
        const embed = yield getReaction(this.name);
        const target = getMember(message, args[0]);
        if (target)
            embed.setDescription(`${message.member} kissed ${target}`);
        else
            embed.setDescription(`${message.member} <.< *kisses you*`);
        message.channel.send(embed);
    })
};
