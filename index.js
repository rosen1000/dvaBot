const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const bot = new Client({ disableEveryone: true });
bot.commands = new Collection();
bot.aliases = new Collection();
bot.categories = readdirSync("./commands/");
require("dotenv").config();

["ready", "guildMemberAdd", "guildMemberRemove", "command"].forEach(handler => {
    require(__dirname + `/handlers/${handler}.js`)(bot);
});

//events
// bot.on("message", async message => {
    // let index = money.indexOf(m => m.name == message.author.id);
    // if (!money[index]) {
    //     money.push({ id: message.author.id, legal: true });
    // }
    // if (money[index].legal == true) {
    //     money[index].legal = false
    //     setTimeout(async () => {
    //         money[index].legal = true;
    //     }, ms("1m"));
    // }

    // {//coins
    //     let coinAmt = Math.floor(Math.random() * 5) + 10;
    //     let baseAmt = Math.floor(Math.random() * 10) + 10;

    //     if (coinAmt == baseAmt) {
    //         User.findOne({
    //             userID: message.author.id,
    //             serverID: message.guild.id
    //         }, async (e, coins) => {
    //             if (e) console.log(e);
    //             if (!coins) {
    //                 const newCoins = new User({
    //                     userID: message.author.id,
    //                     serverID: message.guild.id,
    //                     money: coinAmt
    //                 });
    //                 await newCoins.save().catch(e => console.log(e));
    //             } else {
    //                 coins.money = + coinAmt;
    //                 coins.save().catch(e => console.log(e));
    //             }
    //         });

    //         let emoji = bot.emojis.find(e => e.name == "doritos")
    //         let coinEmbed = new Discord.RichEmbed()
    //             .setAuthor(message.author.username)
    //             .setColor(botconfig.color)
    //             .addField(emoji, `${coinAmt} doritos added be happy!`);

    //         message.channel.send(coinEmbed).then(msg => { msg.delete(3500) });
    //     }
    //     //end coins

    //     //xp
    //     User.findOne({
    //         userID: message.author.id,
    //         serverID: message.guild.id
    //     }, async (e, xp) => {
    //         if (e) console.log(e);
    //         if (!xp) {
    //             const newXP = new User({
    //                 userID: message.author.id,
    //                 serverID: message.guild.id,
    //                 xp: 0,
    //                 level: 1,
    //             });
    //             await newXP.save().catch(e => console.log(e));
    //         }

    //         let xpAdd = Math.floor(Math.random() * 7) + 2;
    //         let currxp = xp.xp;
    //         let currLevel = xp.level;
    //         let nextLevel = (xp.level + 2) * 300;

    //         xp.xp = currxp + xpAdd;
    //         if (nextLevel <= xp.xp) {
    //             xp.level = currLevel + 1;
    //             let LevelUP = new Discord.RichEmbed()
    //                 .setTitle(`${message.author.tag} leveled up! Get a 🍪`)
    //                 .setColor(botconfig.color)
    //                 .addField("Leveled to:", xp.level);

    //             message.channel.send(LevelUP).then(msg => { msg.delete(3500) });
    //         }

    //         xp.save().catch(e => console.log(e));
    //     });
    //     //end xp
    // }

    /* info commands rest in piece*/

    // if (cmd.startsWith(prefix + "help")) {
    //     if (!args[0]) {
    //         let embed = new Discord.RichEmbed()
    //             .setAuthor(message.author.username, message.author.avatarURL)
    //             .setColor(botconfig.color)
    //             .setDescription("use `?help [command-name]` for more info")
    //             .addField("Moderation", "addrole, avatar, ban, botnet, feedback, invite, kick, mute, purge, removerole, report, say, servers, uptime, warn, warnclear, warnlevel")
    //             .addField("Image", "working on it!")
    //             .addField("Coins", "coins, level, pay, setcoins")
    //             .addField("Fun", "8ball, dice, divorce, fortnite, married, marry")
    //             .setTimestamp();
    //         message.channel.send(embed);
    //     }//test.js still exists
    // }
// });

bot.login(process.env.TOKEN);
