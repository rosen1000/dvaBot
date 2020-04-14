import { BotClient } from "../../models/BotClient";
import { Message, MessageEmbed } from "discord.js";
import { getMember } from "../../functions/common";
import { Command } from "../../models/Command";

module.exports = class Egg extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "egg",
            type: "fun",
            description: "Easter egg command!",
            usage: "<MemberResovable>",
            enabled: true,
        });
    }
    run(message: Message, args: Array<string>) {
        let player1egg = new EggObj();
        let player2egg = new EggObj();

        while (player1egg.top && player2egg.top) {
            if (player1egg.fight(player2egg, "top", "top")) {
                player2egg.top = false;
            } else {
                player1egg.top = false;
            }
        }
        while (player1egg.bottom && player2egg.bottom) {
            if (player1egg.fight(player2egg, "bottom", "bottom")) {
                player2egg.bottom = false;
            } else {
                player1egg.bottom = false;
            }
        }
        while (!player1egg.broken() || !player2egg.broken()) {
            if (player1egg.top) {
                if (player1egg.fight(player2egg, "top", "bottom")) {
                    player2egg.top = false;
                } else {
                    player1egg.top = false;
                }
            } else if (player1egg.bottom) {
                if (player1egg.fight(player2egg, "bottom", "top")) {
                    player2egg.top = false;
                } else {
                    player1egg.top = false;
                }
            }
        }

        let embed = new MessageEmbed()
            .setColor(this.bot.config.color)
            .setTitle("Egg Battle!")
            .addField(
                message.author,
                "🥚 " + player1egg.broken() ? "is broken!" : "wins!"
            )
            .addField(
                getMember(message, args) || this.bot.user,
                "🥚 " + player1egg.broken() ? "is broken!" : "wins!"
            );
        message.channel.send(embed);
    }
};

class EggObj {
    top: boolean;
    topStrength: number;
    bottom: boolean;
    bottomStrength: number;

    constructor() {
        this.top = true;
        this.bottom = true;
        this.topStrength = Math.round(Math.random() * 10);
        this.bottomStrength = Math.round(Math.random() * 10);
    }

    broken() {
        return !(this.top && this.bottom);
    }

    fight(enemy: EggObj, side1: "top" | "bottom", side2: "top" | "bottom") {
        return (
            Math.random() * 10 + this[side1 + "Strength"] >
            Math.random() * 10 + enemy[side2 + "Strength"]
        );
    }
}
