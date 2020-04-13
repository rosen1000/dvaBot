import { Message } from "discord.js";
import { BotClient } from "./BotClient";

interface CommandData {
    name: string;
    type: string;
    aliases?: Array<string>;
    usage?: string;
    description: string;
}

class Command {
    readonly bot: BotClient;

    readonly name: string;
    readonly aliases: Array<string>;
    readonly usage: string;
    readonly description: string;

    constructor(bot: BotClient, data: CommandData) {
        this.bot = bot;
        this.name = data.name;
        this.aliases = data.aliases ?? [];
        this.usage = data.usage ?? "";
        this.description = data.description;
    }

    run(message: Message, args: string[]): void {}
}

export { CommandData, Command };
