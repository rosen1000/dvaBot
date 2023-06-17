//@ts-check
const Discord = require('discord.js');
const fs = require('fs');
const { join } = require('path');

/**
 * Get member by mention or id
 * @param {Discord.Message} message
 */
function getMemberFromArgs(message) {
    return message.mentions.members?.first() || null;
}

/**
 * Load directory with arguments
 * @param {String} path relative from project root
 * @param  {...any} args arguments to be passed to directory files
 */
function loadDirectory(path, ...args) {
    let files = fs.readdirSync(path);
    files.forEach(file => {
        require(join(__dirname, '..', path, file))(...args);
    })
}

module.exports = {
    getMemberFromArgs,
    loadDirectory
}
