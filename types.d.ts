import Discord from 'discord.js';

namespace App {
    class Command {
        run: (bot: Discord.Client, message: Discord.Message, args: string[]) => void;
        help: CommandHelp;
    }
    interface CommandHelp {
        name: string;
        type: string;
        description: string;
        use: string;
        intents?: Discord.PermissionFlags[]
    }
}
