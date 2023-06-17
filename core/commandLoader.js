//@ts-check
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

/**
 * @param {Discord.Client} bot
 */
module.exports = (bot) => {
    fs.readdir(path.join(__dirname, '..', 'commands'), (e, dirs) => {
        if (e) console.error(e);
        for (let dir of dirs) {
            fs.readdir(path.join(__dirname, '..', 'commands', dir), (e, files) => {
                if (e) console.error(e);

                let jsfile = files.filter((f) => f.split('.').pop() == 'js');
                if (jsfile.length <= 0) {
                    console.warn('Empty directory: ' + dirs);
                    return;
                }

                let loaded = 0;
                jsfile.forEach((f, i) => {
                    let props = require(path.join(__dirname, '../commands', dir, f));
                    if (!props.help || !props.help.name || !props.help.type) {
                        console.warn(`${f} did not load properly!`);
                    } else {
                        loaded++;
                        bot.commands.set(props.help.name, props);
                    }
                });
                console.log(`(${loaded}) ${dir} loaded`);
            });
        }
    });
};
