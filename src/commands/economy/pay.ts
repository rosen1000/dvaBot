import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";
import { Message } from "discord.js";
import { getMember } from "../../functions/common";
import { MemberInterface, createMember } from "../../models/member";

module.exports = class Pay extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "pay",
            aliases: ["transfer"],
            type: "pay",
            description: "Pay someone some money",
            usage: "<MemberResolvable> <money(number)>",
            enabled: true,
        });
    }
    run(message: Message, args: string[]) {
        let member = getMember(message, args);
        let given = parseInt(args[args.length - 1]);

        if (!member) return message.channel.send("Who should i give the money?");
        if (isNaN(given) || !given)
            return message.channel.send("how many will you pay him");

        this.bot.db.member.findOne(
            {
                userID: message.author.id,
                serverID: message.guild.id,
            },
            async (e, payer: MemberInterface) => {
                if (e) console.log(e);
                if (!payer) payer = <MemberInterface>createMember(this.bot, message);

                if (payer.coins < given)
                    return message.channel.send("Not enoght minerals");
                this.bot.db.member.findOne(
                    {
                        userID: member.id,
                        serverID: message.guild.id,
                    },
                    async (e, reciever: MemberInterface) => {
                        if (e) throw e;
                        if (!reciever)
                            reciever = <MemberInterface>createMember(this.bot, message);
                        payer.coins - given;
                        reciever.coins + given;
                        payer.save();
                        reciever.save();
                        message.channel.send(
                            `${message.author} gave ${given} coins to ${member}!`
                        );
                    }
                );
            }
        );
    }
};
