module.exports = {
    name: "dice",
    type: "fun",
    desc: "Roll a dice with x sides (for all your DnD purposes)",
    use: "[sides]/[<dices>d<sides>]",
    run: async (bot, message, args) => {
        let sides = 6;
        let dices = 1;
        if (args[0]) {
            let temp = args[0].split("d");
            if (temp.length >= 2) {
                if (parseInt(temp[0]) != NaN) dices = parseInt(temp[0]);
                if (parseInt(temp[1]) != NaN) sides = parseInt(temp[1]);
            } else {
                if (parseInt(temp[0]) != NaN) sides = parseInt(temp[0]);
            }
        }

        let output = [];
        for (let i = 0; i < dices; i++) {
            output.push("🎲 " + Math.floor(Math.random() * sides + 1));
        }
        
        message.channel.send(output.join(", "));
    }
}