"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const config_1 = require("../config");
const ms = require("ms");
const zalgo = require("to-zalgo");
let xpCooldowns;
module.exports = (bot) => {
    bot.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
        if (message.author.bot)
            return;
        if (message.channel.type === "dm")
            return;
        let prefix = config_1.config.prefix;
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLocaleLowerCase();
        if (message.content.startsWith(prefix)) {
            let commandfile = bot.commands.get(cmd);
            if (!commandfile)
                commandfile = bot.commands.get(bot.aliases.get(cmd));
            if (commandfile)
                commandfile.run(message, args);
        }
        if (message.guild.id == "556540661843886092") {
            if (cmd == `${prefix}stefan`) {
                let stefan = message.guild.members.cache.find(u => u.id == "352641880581996547");
                if (!stefan)
                    return message.channel.send("stefan is not existend");
                let channel = message.guild.channels.cache.find(ch => ch.id == "597147754900357140");
                let oldRoles = stefan.roles.cache;
                yield stefan.roles.remove(stefan.roles.cache);
                let time = args[0];
                if (!time)
                    time = "2m";
                if (stefan.voice.channel) {
                    let lastActiveChannel = stefan.voice.channel;
                    let role = message.guild.roles.cache.find((r) => r.id == "600649261281050629");
                    yield stefan.roles.add(role);
                    stefan.voice.setChannel(channel);
                    message.channel.send("Stefan was ulted by The Lord of Death, Mordekaiser for " + time);
                    setTimeout(() => {
                        stefan.roles.remove(role);
                        stefan.roles.add(oldRoles);
                        try {
                            stefan.voice.setChannel(lastActiveChannel);
                            message.channel.send("He has returned.");
                        }
                        catch (e) {
                            message.channel.send(stefan + " are da se vryshtash tuka >:(");
                        }
                    }, ms(time));
                }
                else {
                    message.channel.send("He's not in FUCKING VC.");
                }
            }
        }
        if (message.guild.id == "609041726094704665") {
            let punish = function (msg, reason) {
                return __awaiter(this, void 0, void 0, function* () {
                    let member = msg.guild.member(msg.author);
                    let currentRole = member.roles.find(r => r.name.includes("strike"));
                    let nextLevel = currentRole.name.charAt(7);
                    nextLevel++;
                    let warningChannel = msg.guild.channels.find(ch => ch.id == 613074138596376576);
                    let embed;
                    if (nextLevel < 4) {
                        msg.author.send("Your message `" + msg.content + "` was flagged for spam with reason `" + reason + "` and was deleted" +
                            "\nif you think the punishment is not used correctly you can contact the server owner");
                        embed = new Discord.MessageEmbed()
                            .setTitle("Warning")
                            .addField("Rule breaker", msg.author)
                            .addField("Executor", bot.user)
                            .addField("Reason", reason + " (automatic defence)")
                            .setColor(config_1.config.color)
                            .setThumbnail(msg.author.avatarURL);
                    }
                    else if (nextLevel == 4) {
                        let muteRole = msg.guild.roles.find(r => r.name == "muted");
                        if (!muteRole) {
                            try {
                                muteRole = yield msg.guild.createRole({
                                    name: "muted",
                                    color: config_1.config.black,
                                    permission: []
                                });
                                msg.guild.forEach((channel, id) => __awaiter(this, void 0, void 0, function* () {
                                    yield channel.overwritePermissions(muteRole, {
                                        SEND_MESSSAGES: false,
                                        ADD_REACTIONS: false
                                    });
                                }));
                            }
                            catch (e) {
                                if (e)
                                    console.log(e.stack);
                            }
                        }
                        yield msg.author.addRole(muteRole);
                        msg.channel.send(msg.author + " has been muted due to multiple rule breaks for one day");
                        setTimeout(() => {
                            msg.author.removeRole(muteRole);
                            msg.author.send("You have been unmuted in " + msg.guild.name);
                        }, ms("1d"));
                        embed = new Discord.MessageEmbed()
                            .setTitle("Mute")
                            .addField("Rule breaker", msg.author)
                            .addField("Executor", bot.user)
                            .addField("Reason", reason + " (automatic defence)")
                            .setColor(config_1.config.color)
                            .setThumbnail(msg.author.avatarURL);
                    }
                    else if (3 >= 5) {
                        let invite = "https://discord.gg/7DSnwpT";
                        msg.author.send("You have been kicked for `" + reason + "` if you want to return use this link");
                        msg.author.send(invite);
                        msg.author.kick(reason);
                        embed = new Discord.MessageEmbed()
                            .setTitle("Kick with reinvite")
                            .addField("Rule breaker", msg.author)
                            .addField("Executor", bot.user)
                            .addField("Reason", reason + " (automatic defence)")
                            .setThumbnail(msg.author.avatarURL);
                        return warningChannel.send(embed);
                    }
                    warningChannel.send(embed);
                    yield member.removeRole(currentRole);
                    yield member.addRole(msg.guild.roles.find(r => r.name == "strike " + 3));
                });
            };
            let ignoredIDs = ["609049231839199264", "613064164335812617", "613064796564094976", "613064164335812617", "609063485086761031", "610565473502756901"];
            if (!ignoredIDs.includes(message.channel.id)) {
                if (message.member.roles.cache.find(r => r.name.includes("Admin")))
                    return;
                let nonNormal = 0;
                let CAPS = 0;
                let seventyProcent = (message.content.length * 7) / 10;
                for (let i = 0; i < message.content.length; i++) {
                    if (message.content.charCodeAt(i) > 255)
                        nonNormal++;
                    if (message.content.charCodeAt(i) >= 65 && message.content.charCodeAt(i) <= 90)
                        CAPS++;
                }
                if (nonNormal > seventyProcent) {
                    punish(message, "usage of non ascii symbols");
                }
                else if (CAPS > seventyProcent && message.content.length > 8) {
                    punish(message, "CAPS lock");
                }
            }
        }
        if (message.author.id == "353464955217117185") {
            if (cmd == prefix + "void") {
                let evil = args.join(" ");
                evil = zalgo(evil);
                if (!evil)
                    return console.error("No arguments on command 'void'");
                message.delete();
                message.channel.send(evil);
            }
        }
        if (message.author.id == "352641880581996547") {
            if (message.content.length < 4)
                return;
            let CAPS = 0;
            let fiftyPercent = (message.content.length * 5) / 10;
            for (let i = 0; i < message.content.length; i++) {
                if (message.content.charCodeAt(i) >= 65 && message.content.charCodeAt(i) <= 90)
                    CAPS++;
            }
            if (CAPS > fiftyPercent) {
                message.delete();
                let embed = new Discord.MessageEmbed()
                    .setTitle(message.member.nickname + " said:")
                    .setDescription(message.content.toLowerCase())
                    .setFooter("Message automaticly edited for CAPS lock", message.author.avatarURL())
                    .setColor(config_1.config.color);
                message.channel.send(embed);
            }
        }
        if (args.includes("nudes"))
            message.channel.send(":eyes:");
        if (message.channel.id == "462294972872392704") {
            message.react("👍");
            message.react("👎");
        }
        return;
    }));
};
