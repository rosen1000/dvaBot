const Discord = require("discord.js");

/**
 * @type {Map<string, Discord.VoiceChannel} voiceChannels
 */
let voiceChannels = new Map();

/**
 * @param {Discord.Client} bot
 */
module.exports = (bot) => {
    bot.on("voiceStateUpdate", async (oldState, newState) => {
        if (newState.guild.id != "417384366893826049") return;

        // Joining the "New Chammel"
        if (newState.channelID == "654318855346323467") {
            let channelCreator = bot.channels.resolve("654318855346323467");
            let newChannel = await newState.guild.channels.create(
                calculateName(newState),
                {
                    type: "voice",
                    parent: channelCreator.parent,
                    position: channelCreator.position + 1,
                }
            );

            voiceChannels.set(newChannel.id, newChannel);
            await newState.member.voice.setChannel(newChannel);
        }

        // Leaving created channel
        if (voiceChannels.size > 0 && voiceChannels.has(oldState.channelID)) {
            if (voiceChannels.get(oldState.channelID).members.size == 0) {
                voiceChannels.delete(oldState.channelID);
                oldState.channel.delete();
            }
        }
    });
};

/**
 * @param {Discord.VoiceState} state
 */
function calculateName(state) {
    let members = state.channel.members,
        games = members.map((m) => m.user.presence.activities[0].name),
        counter = 0,
        temp = games[0];
    games.sort((a, b) => b - a);
    for (let game of games) if (game == temp) counter++;
    if (counter > 0) return `${counter} ${counter == 1 ? "is" : "are"} playing ${temp}`;
    return `Channel ${voiceChannels.size + 1}`;
}
