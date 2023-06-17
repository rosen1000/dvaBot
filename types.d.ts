import Discord from 'discord.js';

declare module 'discord.js' {
    export interface Client {
        commands: Discord.Collection<string, Command>
    }
}

class Command {
    // exports: {
        run: (bot: Discord.Client, message: Discord.Message, args: string[]) => any
        help: {}
    // }
}