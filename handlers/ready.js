const ms = require("ms");

module.exports = (bot) => {
    bot.on("ready", async () => {
        console.log(`${bot.user.username} is online in ${bot.guilds.size} servers ^^`);

        const statuses = require('../statuses.json');
        bot.user.setActivity("youtube", { type: "WATCHING" });

        setInterval(() => {
            let status;
            do {
                status = statuses[Math.floor(Math.random() * statuses.length)];
            } while (status.status == bot.user.presence.status); 
            let regex = /\{{2}(.+)\}{2}/;
            let text;
            if (regex.test(status.status)) {
                text = status.status.replace(/\{{2}(.+)\}{2}/, function (match, p1) {
                    let [prop, key] = p1.split(".");
                    return bot[prop][key];
                });
            } else {
                text = status.status;
            }
            bot.user.setActivity(text, { type: status.type });
        }, ms("30m"));

        let channelJoin = bot.channels.find(ch => ch.id == 654318855346323467);
        if (channelJoin) {
            console.log("Channel found!");
            bot.on("voiceStateUpdate", async (oldMember, newMember) => {
                // if (oldMember.guild.id != 417384366893826049) return;
                let expandableChannels = newMember.guild.channels.filter(ch => ch.type == "voice" && ch.name.includes("New Channel"));
                if (newMember.voiceChannel == channelJoin) {
                    let channel = await channelJoin.clone("New Channel " + (parseInt(expandableChannels.size) + 1));
                    channel.setParent(newMember.voiceChannel.parent);
                    channel.setPosition(newMember.voiceChannel.position + 1);
                    newMember.setVoiceChannel(channel);
                }
                if (expandableChannels.find(c => c.id == oldMember.voiceChannelID)) {
                    let target = await oldMember.guild.channels.find(ch => ch.id == oldMember.voiceChannelID);
                    if (target.members.size == 0) {
                        await target.delete();
                    }
                }
            });
        }
    });
}