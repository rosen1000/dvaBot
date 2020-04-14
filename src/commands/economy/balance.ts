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
        });
    }
    run(message: Message, args: string[]) {
        console.log(0);
        this.bot.db.member.findOne(
            { id: message.author.id },
            (err: Error, member: MemberInterface) => {
                if (!member) {
                    member = createMember(message);
                    member.save((e) => {
                        if (e) throw e;
                    });
                }
                message.channel.send(`You have ${member.coins} coins!`);
            }
        );
        message.channel.send("ping")
    }
}
