const Discord = require('discord.js');
const axios = require('axios').default;

let perks, killers, survivors;

(async () => {
    perks = (await axios.get('https://dbd-api.herokuapp.com/perks')).data;
    killers = (await axios.get('https://dbd-api.herokuapp.com/killers')).data;
    survivors = (await axios.get('https://dbd-api.herokuapp.com/survivors')).data;
})();

/**
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (bot, message, args) => {
    if (!args[0]) return message.channel.send('No arguments passed');
    if (args[0].toLowerCase() === 'shrine') {
        let data = (await axios.get('https://dbd.onteh.net.au/api/shrine')).data;
        let embed = new Discord.MessageEmbed()
            .setTitle('Shrine')
            .setDescription(data.perks.map((p) => p.id.split('_').join(' ')).join(', '))
            .addField('Started at', new Date(data.start * 1000))
            .addField('Ended at', new Date(data.end * 1000))
            .setColor('RED');
        message.channel.send(embed);
    } else {
        if (!args[1]) return message.channel.send('No character specified');
        if (args[0].toLowerCase().startsWith('surv')) {
            let char = dataset.find((c) => c.name.toLowerCase().startsWith(args[1]));
            let embed = new Discord.MessageEmbed()
                .setTitle(char.name)
                .setDescription(char.lore)
                .addField('Difficulty', char.difficulty)
                .addField('Perks', char.perks.map((p) => p.split(/(?=[A-Z])/).join(' ')))
                .setThumbnail(char.icon.portrait)
                .addField('Speed', char.speed);
            message.channel.send(embed);
        } else if (args[0].toLowerCase().startsWith('kill')) {
        } else return message.channel.send('No correct character type specified');
    }
};

module.exports.help = {
    name: 'dbd',
    type: 'info',
    desc: 'Shows info from Dead by Daylight',
    use: 'dbd <"survivor", "killer", "shrine"> [name]',
};
