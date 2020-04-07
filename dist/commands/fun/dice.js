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
    name: "dice",
    type: "fun",
    desc: "Roll a dice with x sides (for all your DnD purposes)",
    use: "[sides]/[<dices>d<sides>]",
    run: (bot, message, args) => __awaiter(this, void 0, void 0, function* () {
        let sides = 6;
        let dices = 1;
        if (args[0]) {
            let temp = args[0].split("d");
            if (temp.length >= 2) {
                if (parseInt(temp[0]) != NaN)
                    dices = parseInt(temp[0]);
                if (parseInt(temp[1]) != NaN)
                    sides = parseInt(temp[1]);
            }
            else {
                if (parseInt(temp[0]) != NaN)
                    sides = parseInt(temp[0]);
            }
        }
        let output = [];
        for (let i = 0; i < dices; i++) {
            output.push("🎲 " + Math.floor(Math.random() * sides + 1));
        }
        message.channel.send(output.join(", "));
    })
};
