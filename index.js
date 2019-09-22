const botconfig = require("./botconfig.json");
const welcomejson = require("./welcomes.json");
const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();
require("dotenv").config();
// const dataBase = require("./models/keyv.js");

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === 'js')
    if (jsfile.length <= 0) {
        console.log("Couln't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("ready", async () => {
    const status = require('./statuses.json');
    console.log(`${bot.user.username} is online in ${bot.guilds.size} servers ^^`);
    // bot.user.setPresence({game: {name: "test"}, status: "invisible"});
    bot.user.setActivity("youtube", { type: "WATCHING" })
    //bot.user.setActivity("Overwatch");
});

//events
bot.on("guildMemberAdd", async member => {
    //Eva's server
    if (member.guild.id == 514125758751440896) {
        let welcomeChannel = member.guild.channels.find(ch => ch.id == 514125758751440900);
        if (!welcomeChannel) return;
        
        let rulesChannel = member.guild.channels.find(ch => ch.id == 519828142370586625);
        let introductionChannel = member.guild.channels.find(ch => ch.id == 604352341726199838);
        console.log(welcomeChannel.guild.channels.find(ch => ch.id == "514125758751440900"))
        welcomeChannel.guild.channels.find(ch => ch.id == 514125758751440900).send(`Welcome ${member} Make sure to read and follow the ${rulesChannel} and introduce yourself in ${introductionChannel}. Have a great time!`);
        return;
    }
    let memberrole = member.guild.roles.find(r => r.name == "Members");
    let botrole = member.guild.roles.find(r => r.name == "BOTS");
    if (memberrole) {
        if (!member.user.bot) {
            await member.addRole(memberrole.id)
        }
    }
    if (botrole) {
        if (member.user.bot) {
            await member.addRole(botrole.id)
        }
    }

    let numMSG = Math.floor(Math.random() * 37) + 1;
    let wellcomemsg = welcomejson[numMSG]
    var sendMSG = wellcomemsg.replace("${member}", member)
    var welcomeChannel = member.guild.channels.find(ch => ch.name == "welcome");
    if (!welcomeChannel) return;
    welcomeChannel.send(`${sendMSG}`)
});

bot.on("guildMemberRemove", async member => {
    if (!member.guild.id == "461428273943937044") return;
    let welcomeChannel = member.guild.channels.find(ch => ch.name == "welcome");
    if (!welcomeChannel) return;
    welcomeChannel.send(`${member.user.username} has departed to Auir!`)
})

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (message.channel.id == "471208730688487424") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();
    let args = messageArray.slice(1);
    if (message.content.startsWith("?")) {
        let commandfile = bot.commands.get(cmd.slice(prefix.length));
        if (commandfile) commandfile.run(bot, message, args);
    }

    //Server specific commands
    if (message.guild.id == 556540661843886092) {
        if (cmd == `${prefix}stefan`) {
            let stefan = message.guild.members.find(u => u.id == 352641880581996547);
            if (!stefan) return message.channel.send("stefan is not existend");
            let channel = message.guild.channels.find(ch => ch.id == 597147754900357140);
            let oldRoles = stefan.roles;
            await stefan.removeRoles(stefan.roles);
            let time = args[0];
            if (!time) time = "2m";
            if (stefan.voiceChannel) {
                let lastActiveChannel = stefan.voiceChannel;
                let role = message.guild.roles.find((r) => r.id == 600649261281050629);
                await stefan.addRole(role);
                stefan.setVoiceChannel(channel);
                message.channel.send("Stefan was ulted by The Lord of Death, Mordekaiser for " + time);
                setTimeout(() => {
                    stefan.removeRole(role);
                    stefan.addRoles(oldRoles);
                    try {
                        stefan.setVoiceChannel(lastActiveChannel);
                        message.channel.send("He has returned.");
                    } catch(e) {
                        message.channel.send(stefan + " are da se vryshtash tuka >:(");
                    }
                }, ms(time));
            } else {
                message.channel.send("He's not in FUCKING VC.");
            }
        }
    }

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

    if (cmd.includes("nudes")) message.channel.send(":eyes:")

    if (message.channel.id == "462294972872392704") {
        message.react("👍");
        message.react("👎");
    }
});

function giveXP(user) {
    
}

bot.login(process.env.TOKEN);