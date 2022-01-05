const Discord = require('discord.js');
const builder = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { MessageButtonStyles } = require('discord.js');

/**
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (bot, message, args) => {
    if (message.author.id != '353464955217117185') return;
    let row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton().setCustomId('first').setLabel('Test').setStyle('PRIMARY'),
    );

    message.channel.send({ content: 'mamka mu', components: [row] });
    // let command = new builder.SlashCommandBuilder()
    //     .setName('test')
    //     .setDescription('testing stuff')
    //     .addBooleanOption(new builder.SlashCommandBooleanOption().setName('alive').setDescription('majka ti :)'))
    //     .toJSON();
    // const rest = new REST({ version: 9 }).setToken(process.env.TOKEN);
    // rest.put(Routes.applicationGuildCommands(bot.user.id, message.guild.id), { body: [command] });
};

module.exports.help = {
    name: 'test',
    type: 'admin',
    desc: 'private command',
    use: '',
};
