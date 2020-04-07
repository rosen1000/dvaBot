import { BotClient } from "../models/BotClient";
import { TextChannel, VoiceChannel } from "discord.js";

module.exports = (bot: BotClient) => {
    bot.on("voiceStateUpdate", async (oldMember, newMember) => {
        let channelJoin = <VoiceChannel>bot.channels.cache.find(ch => ch.id == "654318855346323467");
        if (!channelJoin) return;
        let expandableChannels = newMember.guild.channels.cache.filter(ch => ch.type == "voice" && ch.name.includes("New Channel"));
        if (newMember.member.voice.channel == channelJoin) {
            let number = expandableChannels.size;
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
            let channel = await channelJoin.clone({ name: "New Channel " + (number + 1) });
            channel.setParent(newMember.member.voice.channel.parent);
            channel.setPosition(newMember.member.voice.channel.position + 1);
            newMember.member.voice.setChannel(channel);
        }
        if (expandableChannels.find(c => c.id == oldMember.member.voice.channelID)) {
            let target = await oldMember.guild.channels.cache.find(ch => ch.id == oldMember.member.voice.channelID);
            if (target.members.size == 0) {
                await target.delete();
            }
        }
        function orderChannels() {
            let currentChannel;
            let channelsOrdered = newMember.guild.channels.cache.array().slice(0);
            channelsOrdered = channelsOrdered.filter((ch) => { return ch.type == "voice" && typeof ch.position !== "undefined" });
            channelsOrdered = channelsOrdered.sort((a, b) => { return a.position - b.position });
            let currentPosition = channelJoin.position;
            channelsOrdered.forEach((ch) => {
                currentChannel = bot.channels.cache.get(ch.id);
                currentChannel.edit({ position: currentPosition });
                currentPosition++;
            })
        }
    });
}