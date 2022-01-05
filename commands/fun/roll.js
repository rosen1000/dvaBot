const Discord = require('discord.js');

module.exports = {
	name: 'roll',
	category: 'fun',
	description: 'Roll the d20! better version of ?dice',
	use: 'roll [times=1]d<faces> | [times=1](faces=6)',
	enabled: true,
	/**
	 * @param {Discord.Client} bot
	 * @param {Discord.Message} message
	 * @param {string[]} args
	 */
	run: async (bot, message, args) => {
		let times = args[0] ? parseInt(args[0].split('d')[0]) : 1;
		let faces = args[0] ? parseInt(args[0].split('d')[1]) : 6;
		let output = [];
		for (let i = 0; i < times; i++) output.push(Math.floor(Math.random() * faces) + 1);
		message.channel.send(`${output.reduce((a, b) => a + b)} 🎲 (${output.join(', ')})`);
	},
};
