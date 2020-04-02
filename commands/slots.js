const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
// const SelfReloadJSON = require("self-reload-json");
// let coins = new SelfReloadJSON("./coins.json");

module.exports.run = async (bot, message, args) => {
    // await message.delete();
    // const filter = m => m.author.id === message.author.id;
    // message.channel.send("How much coins will you commit (min 5)");
    // message.channel.awaitMessages(filter, {max: 1, time: 120000}).then(collected => {
        // if(collected.first().content.toLowerLocaleCase === "cancel"){
        //     return message.channel.send("canceled!");
        // }
        // let payed = collected.first().content;

        // if(isNaN(payed)) return message.channel.send("This is not a number");

        // if(payed < 5) return message.channel.send("minimum is 5 coins");
        // if(!coins[message.author.id].coins) return message.channel.send("Not enogth doritos")
        // if(coins[message.author.id].coins < payed){
        //     return message.channel.send("Not enogth doritos");
        // }

        let emojis = ["🍒", "🍎", "📘", "😝", "💙", "💵"];
        let a = Math.floor(Math.random() * emojis.length);
        let b = Math.floor(Math.random() * emojis.length);
        let c = Math.floor(Math.random() * emojis.length);

        let x = [], y = [], z = [];
        for (let i = 0; i < 3; i++) {
            x[i] = emojis[a];
            a++;
            if(a == emojis.length) a = 0;
        }
        for (let i = 0; i < 3; i++) {
            y[i] = emojis[b];
            b++;
            if(b == emojis.length) b = 0;
        }
        for (let i = 0; i < 3; i++) {
            z[i] = emojis[c];
            c++;
            if(c == emojis.length) c = 0;
        }
        let end;

        if (a == b && b == c) {
            end = 'JACKPOT!!!';
            // coins[message.author.id].coins = coins[message.author.id].coins - payed;
        } else if (a == b || a == c || b == c) {
            end = 'Good one!';
            // coins[message.author.id].coins = coins[message.author.id].coins + payed * 0.5;
        } else {
            end = 'You lost :(';
            // coins[message.author.id].coins = coins[message.author.id].coins + payed * 2;
        }

        let embed = new Discord.MessageEmbed()
        .setTitle("SLOTS!")
        .setColor(botconfig.color)
        .addField(end, `${x[0]} ${y[0]} ${z[0]}\n
                        ${x[1]} ${y[1]} ${z[1]}\n
                        ${x[2]} ${y[2]} ${z[2]}`);
        message.channel.send(embed);
        
        // coins.save("utf-8", coins)
    // }).catch(err => {
    //     console.log(err);
    //     if(err) message.channel.send("outdated");
    // })


}

module.exports.help = {
    name: "slots",
    type: "fun",
    desc: "roll slotmachine",
    use: "?slots"
}