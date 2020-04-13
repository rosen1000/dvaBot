import { BotClient } from "../../models/BotClient";
import { Message, MessageEmbed } from "discord.js";
import { getMember } from "../../functions/common";

module.exports = {
    name: "egg",
    category: "fun",
    desc: "Easter egg command!",
    use: "<MemberResovable>",
    enabled: true,
    run: async (bot: BotClient, message: Message, args: Array<string>) => {
        let player1egg = new Egg();
        let player2egg = new Egg();

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
        .setColor(bot.config.color)
        .setTitle("Egg Battle!")
        .addField(message.author, "🥚 " + player1egg.broken() ? "is broken!": "wins!")
        .addField(getMember(message, args[0]) || bot.user, "🥚 " + player1egg.broken() ? "is broken!": "wins!")
        message.channel.send(embed);
    },
};

class Egg {
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

    fight(enemy: Egg, side1: "top" | "bottom", side2: "top" | "bottom") {
        return (
            Math.random() * 10 + this[side1 + "Strength"] >
            Math.random() * 10 + enemy[side2 + "Strength"]
        );
    }
}
