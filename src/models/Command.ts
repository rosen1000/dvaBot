import { Message } from "discord.js";
import { BotClient } from "./BotClient";

interface CommandData {
    name: string;
    type: string;
    aliases?: Array<string>;
    usage?: string;
    description: string;
    enabled: boolean
    hidden?: boolean
}

class Command {
    readonly bot: BotClient;

    readonly name: string;
    readonly type: string;
    readonly aliases: Array<string>;
    readonly usage: string;
    readonly description: string;
    readonly enabled: boolean;
    readonly hidden: boolean;

    constructor(bot: BotClient, data: CommandData) {
        this.bot = bot;
        this.name = data.name;
        this.type = data.type;
        this.aliases = data.aliases ?? [];
        this.usage = data.usage ?? "";
        this.description = data.description;
        this.enabled = data.enabled;
        this.hidden = data.hidden || false;
    }

    run(message: Message, args: string[]): void {}
}

export { CommandData, Command };
