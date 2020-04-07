"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (bot) => {
    bot.on("voiceStateUpdate", (oldMember, newMember) => __awaiter(void 0, void 0, void 0, function* () {
        let channelJoin = bot.channels.cache.find(ch => ch.id == "654318855346323467");
        if (!channelJoin)
            return;
        let expandableChannels = newMember.guild.channels.cache.filter(ch => ch.type == "voice" && ch.name.includes("New Channel"));
        if (newMember.member.voice.channel == channelJoin) {
            let number = expandableChannels.size;
            let tempChannels = [];
            for (let channel in expandableChannels) {
                tempChannels.push(channel);
            }
            for (let i = 0; i < tempChannels.length; i++) {
                if (parseInt(tempChannels[i].name.split(" ")[2]) != i + 1) {
                    number = i;
                    break;
                }
            }
            let channel = yield channelJoin.clone({ name: "New Channel " + (number + 1) });
            channel.setParent(newMember.member.voice.channel.parent);
            channel.setPosition(newMember.member.voice.channel.position + 1);
            newMember.member.voice.setChannel(channel);
        }
        if (expandableChannels.find(c => c.id == oldMember.member.voice.channelID)) {
            let target = yield oldMember.guild.channels.cache.find(ch => ch.id == oldMember.member.voice.channelID);
            if (target.members.size == 0) {
                yield target.delete();
            }
        }
        function orderChannels() {
            let currentChannel;
            let channelsOrdered = newMember.guild.channels.cache.array().slice(0);
            channelsOrdered = channelsOrdered.filter((ch) => { return ch.type == "voice" && typeof ch.position !== "undefined"; });
            channelsOrdered = channelsOrdered.sort((a, b) => { return a.position - b.position; });
            let currentPosition = channelJoin.position;
            channelsOrdered.forEach((ch) => {
                currentChannel = bot.channels.cache.get(ch.id);
                currentChannel.edit({ position: currentPosition });
                currentPosition++;
            });
        }
    }));
};
