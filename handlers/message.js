const botconfig = require("../botconfig.json");
const ms = require("ms");
const zalgo = require("to-zalgo");
const mongoose = require("../models/mongoose");
const memberSchema = require("../models/member");
const serverSchema = require("../models/server");
let xpCooldowns;

module.exports = (bot) => {
    bot.on("message", async (message) => {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;
    
        let prefix = botconfig.prefix;
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLocaleLowerCase();
    
        if (message.content.startsWith(prefix)) {
            let commandfile = bot.commands.get(cmd);
            if (!commandfile) commandfile = bot.commands.get(bot.aliases.get(cmd));
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
                        } catch (e) {
                            message.channel.send(stefan + " are da se vryshtash tuka >:(");
                        }
                    }, ms(time));
                } else {
                    message.channel.send("He's not in FUCKING VC.");
                }
            }
        }
        if (message.guild.id == 609041726094704665) {
            let punish = async function (msg, reason) {
                let member = msg.guild.member(msg.author);
                let currentRole = member.roles.find(r => r.name.includes("strike"));
                let nextLevel = currentRole.name.charAt(7)++;
                let warningChannel = msg.guild.channels.find(ch => ch.id == 613074138596376576);
                let embed;
    
                if (nextLevel < 4) {
                    msg.author.send("Your message `" + msg.content + "` was flagged for spam with reason `" + reason + "` and was deleted" +
                        "\nif you think the punishment is not used correctly you can contact the server owner");
                    embed = new Discord.RichEmbed()
                        .setTitle("Warning")
                        .addField("Rule breaker", msg.author)
                        .addField("Executor", bot.user)
                        .addField("Reason", reason + " (automatic defence)")
                        .setColor(botconfig.color)
                        .setThumbnail(msg.author.avatarURL);
                } else if (nextLevel == 4) {
                    let muteRole = msg.guild.roles.find(r => r.name == "muted");
                    if (!muteRole) {
                        try {
                            muteRole = await msg.guild.createRole({
                                name: "muted",
                                color: botconfig.black,
                                permission: []
                            });
                            msg.guild.forEach(async (channel, id) => {
                                await channel.overwritePermissions(muteRole, {
                                    SEND_MESSSAGES: false,
                                    ADD_REACTIONS: false
                                });
                            });
                        } catch (e) {
                            if (e) console.log(e.stack);
                        }
                    }
    
                    await msg.author.addRole(muteRole);
                    msg.channel.send(msg.author + " has been muted due to multiple rule breaks for one day");
    
                    setTimeout(() => {
                        msg.author.removeRole(muteRole);
                        msg.author.send("You have been unmuted in " + msg.guild.name);
                    }, ms("1d"));
    
                    embed = new Discord.RichEmbed()
                        .setTitle("Mute")
                        .addField("Rule breaker", msg.author)
                        .addField("Executor", bot.user)
                        .addField("Reason", reason + " (automatic defence)")
                        .setColor(botconfig.color)
                        .setThumbnail(msg.author.avatarURL);
                } else if (level >= 5) {
                    let invite = "https://discord.gg/7DSnwpT"
                    msg.author.send("You have been kicked for `" + reason + "` if you want to return use this link");
                    msg.author.send(invite);
                    msg.author.kick(reason);
                    embed = new Discord.RichEmbed()
                        .setTitle("Kick with reinvite")
                        .addField("Rule breaker", msg.author)
                        .addField("Executor", bot.user)
                        .addField("Reason", reason + " (automatic defence)")
                        .setThumbnail(msg.author.avatarURL);
                    return warningChannel.send(embed);
                }
    
                warningChannel.send(embed)
    
                await member.removeRole(currentRole);
                await member.addRole(msg.guild.roles.find(r => r.name == "strike " + level))
            }
            //Spam detection
            let ignoredIDs = [609049231839199264, 613064164335812617, 613064796564094976, 613064164335812617, 609063485086761031, 610565473502756901]
            if (!ignoredIDs.includes(message.channel.id)) {
                if (message.member.roles.find(r => r.name.includes("Admin"))) return;
                let nonNormal = 0;
                let CAPS = 0;
                let seventyProcent = (message.content.length * 7) / 10;
    
                for (let i = 0; i < message.content.length; i++) {
                    if (message.content.charCodeAt(i) > 255) nonNormal++;
                    if (message.content.charCodeAt(i) >= 65 && message.content.charCodeAt(i) <= 90) CAPS++;
                }
    
                if (nonNormal > seventyProcent) {
                    punish(message, "usage of non ascii symbols");
                } else if (CAPS > seventyProcent && message.content.length > 8) {
                    punish(message, "CAPS lock");
                }
            }
        }
    
        //Person specific commands
        if (message.author.id == 353464955217117185) {
            if (cmd == prefix + "void") {
                let evil = args.join(" ");
                evil = zalgo(evil);
                if (!evil) return console.error("No arguments on command 'void'");
                message.delete();
                message.channel.send(evil);
            }
        }
        if (message.author.id == 352641880581996547) {
            if (message.content.length < 4) return;
            let CAPS = 0;
            let fiftyPercent = (message.content.length * 5) / 10;
    
            for (let i = 0; i < message.content.length; i++) {
                if (message.content.charCodeAt(i) >= 65 && message.content.charCodeAt(i) <= 90) CAPS++;
            }
    
            if (CAPS > fiftyPercent) {
                message.delete();
                let embed = new Discord.RichEmbed()
                    .setTitle(message.member.nickname + " said:")
                    .setDescription(message.content.toLowerCase())
                    .setFooter("Message automaticly edited for CAPS lock", message.author.displayAvatarURL)
                    .setColor(botconfig.color);
                message.channel.send(embed);
            }
        }
        
        if (args.includes("nudes")) message.channel.send(":eyes:")

        if (message.channel.id == "462294972872392704") {
            message.react("👍");
            message.react("👎");
        }

        let member = mongoose.model("member", memberSchema);
        let server = mongoose.model("server", serverSchema);
        member.find({ userID: message.author.id, serverID: message.guild.id }, async (e, user) => {
            if (e) console.log(e);
            if (!user) {
                let newMember = memberSchema({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    money: 0,
                    level: 1,
                    xp: 0
                });
                newMember.save().catch(e => { if (e) console.log(e) });
            } else {
                if (!xpCooldowns.includes(message.author.id)) {
                    xpCooldowns.push(message.author.id);
                    setTimeout(() => {
                        xpCooldowns.shift();
                    }, ms("30s"));
                    let addedXP = Math.floor(Math.random() * 10) + 5;
                    user.xp += addedXP;
                    // nextLevelXP = 2 * currentLevel ^ 2 + 20
                    // x = 2y^2 + 20
                    let nextLevelXP = 2 * user.level ^ 2 + 20;
                    if (user.xp > nextLevelXP) {
                        const embed = new Discord.RichEmbed()
                            .addField("You leveled up! Have a 🍪", user.level + " => " + user.level + 1)
                            .setColor(botconfig.color)
                            .setFooter(message.author.username, message.author.displayAvatarURL);
                        message.channel.send(embed).then(msg => { msg.delete(4000) });
                        user.level += 1;
                    }
                }
                let coinAmt = Math.floor(Math.random() * 18) + 10;
                let baseAmt = Math.floor(Math.random() * 15) + 10;
                if (coinAmt == baseAmt) {
                    user.money += coinAmt;
                    let emoji;
                    await server.findOne({ id: message.guild.id }, (e, guild) => {
                        if (e) console.log(e);
                        if (guild) emoji = message.guild.emojis.find(e => { e.name == guild.coinName });
                        
                    });
                }
                user.save().catch(e => { if (e) console.log(e); });
            }
        });
    });
}