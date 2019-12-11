module.exports = (bot) => {
    bot.on("voiceStateUpdate", async (oldMember, newMember) => {
        let channelJoin = bot.channels.find(ch => ch.id == 654318855346323467);
        if (!channelJoin) return;
        let expandableChannels = newMember.guild.channels.filter(ch => ch.type == "voice" && ch.name.includes("New Channel"));
        if (newMember.voiceChannel == channelJoin) {
            let number = parseInt(expandableChannels.size);
            let tempChannels = [];
            for (let channel in expandableChannels) {
                tempChannels.push(channel)
            }
            for (let i = 0; i < tempChannels.length; i++) {
                if (parseInt(tempChannels[i].name.split(" ")[2]) != i + 1) {
                    number = i;
                    break;
                }
            }
            let channel = await channelJoin.clone("New Channel " + (number + 1));
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
        function orderChannels() {
            let channelsOrdered = bot.channels.array().slice(0);
            channelsOrdered = channelsOrdered.filter((ch) => { return ch.type == "voice" && typeof ch.position !== "undefined" });
            channelsOrdered = channelsOrdered.sort((a, b) => { return a.position - b.position });
            let currentPosition = channelJoin.position;
            channelsOrdered.forEach((ch) => {
                currentChannel = bot.channels.get(ch);
                currentChannel.edit({ position: currentPosition });
                currentPosition++;
            })
        }
    });
}