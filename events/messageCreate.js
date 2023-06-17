//@ts-check
const Discord = require('discord.js');
const ms = require('ms');
const botconfig = require('../botconfig.json');

/**
 * @param {Discord.Client} bot
 */
module.exports = (bot) => {
    bot.on('messageCreate', async (message, a) => {
        if (message.author.bot) return;
        if (message.channel.isDMBased()) return;

        let prefix = process.argv.includes('--dev') ? '/' : botconfig.prefix;
        let messageArray = message.content.split(' ');
        let cmd = messageArray[0].toLocaleLowerCase();
        let args = messageArray.slice(1);
        if (message.content.startsWith(prefix)) {
            let commandfile = bot.commands.get(cmd.slice(prefix.length));
            if (commandfile) commandfile.run(bot, message, args);
        }

        //Server specific commands
        if (message.guild?.id == '556540661843886092') {
            if (cmd == `${prefix}stefan`) {
                let stefan = message.guild.members.resolve('352641880581996547');
                if (!stefan) {
                    message?.channel.send('stefan is not existend');
                    return;
                }
                let channel = message.guild.channels.resolve('597147754900357140');
                let oldRoles = stefan.roles.cache;
                await stefan.roles.remove(stefan.roles.cache);
                let time = args[0];
                if (!time) time = '2m';
                if (!stefan.voice.channel) {
                    message.channel.send("He's not in a FUCKING VC.");
                    return;
                }
                let lastActiveChannel = stefan.voice.channel;
                let role = message.guild.roles.resolve('600649261281050629');
                if (role) await stefan.roles.add(role);
                if (channel && channel.isVoiceBased()) stefan.voice.setChannel(channel);
                message.channel.send('Stefan was ulted by The Lord of Death, Mordekaiser for ' + time);
                setTimeout(async () => {
                    if (!stefan) return;
                    if (role) stefan.roles.remove(role);
                    stefan.roles.add(oldRoles);
                    try {
                        await stefan.voice.setChannel(lastActiveChannel);
                        await message.channel.send('He has returned.');
                    } catch (e) {
                        message.channel.send(`${stefan} are da se vryshtash tuka >:(`);
                    }
                }, ms(time));
            }
        }

        //Person specific commands
        // TODO
        // if (message.author.id == '353464955217117185') {
        //     if (cmd == prefix + 'void') {
        //         let evil = args.join(' ');
        //         evil = zalgo(evil);
        //         if (!evil) return console.error("No arguments on command 'void'");
        //         message.delete();
        //         message.channel.send(evil);
        //     }
        // }
    });
};
