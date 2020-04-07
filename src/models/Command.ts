import { Message } from "discord.js";
import { BotClient } from "./BotClient";

interface CommandData {
    name: string;
    aliases?: Array<string>;
    usage?: string;
    description: string;
}

class Command {
    readonly client: BotClient;

    readonly name: string;
    readonly aliases: Array<string>;
    readonly usage: string;
    readonly description: string;

    constructor(client: BotClient, data: CommandData) {
        this.client = client;
        this.name = data.name;
        this.aliases = data.aliases ?? [];
        this.usage = data.usage ?? "";
        this.description = data.description;
    }

    public run(message: Message, args: string[]): void {}
}

export { CommandData, Command };
