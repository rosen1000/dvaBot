import { BotClient } from "../../models/BotClient";
import { Command } from "../../models/Command";
import { Message, MessageEmbed } from "discord.js";
import { MemberInterface, createMember } from "../../models/member";
import { getMember } from "../../functions/common";

module.exports = class Balance extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "balance",
            type: "economy",
            aliases: ["money", "coins"],
            description: "Check your current money",
            enabled: true,
        });
    }
    run(message: Message, args: string[]) {
        let member = getMember(message, args);
        let emoji = this.bot.emojis.cache.find((e) => e.name == "doritos");
        if (!member) member = message.member;

        this.bot.db.member.findOne(
            {
                userID: member.id,
                serverID: message.guild.id,
            },
            async (e, coins: MemberInterface) => {
                if (e) throw e;
                if (!coins) {
                    coins = <MemberInterface>createMember(this.bot, message);
                }
                let embed = new MessageEmbed()
                    .setColor(this.bot.config.color)
                    .setDescription(`${message.member} has ${coins.coins} doritos ${emoji}`);
                message.channel.send(embed);
            }
        );
    }
};
