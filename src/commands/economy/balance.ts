import { BotClient } from "../../models/BotClient";
import { Command } from "../../models/Command";
import { Message } from "discord.js";
import { MemberInterface, createMember } from "../../models/member";

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
    async run(message: Message, args: string[]) {
        this.bot.db.member.findOne(
            { id: message.author.id },
            (err: Error, member: MemberInterface) => {
                if (err) return console.log(err);
                if (!member) {
                    member = <MemberInterface>createMember(this.bot, message);
                }
                message.channel.send(`You have ${member.coins} coins!`);
            }
        );
        message.channel.send("ping");
    }
};
