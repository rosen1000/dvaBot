import { Message, GuildMember, User, EmojiResolvable } from "discord.js";

export { getMember, formatDate, promptMessage };

function getMember(message: Message, args: string[]): GuildMember {
    return (
        message.guild.member(message.mentions.users.first()) ||
        message.guild.member(args[0])
    );
}

function formatDate(date: Date): string {
    let options = {
        dateStyle: "short",
        timeZone: "Europe/Sofia",
    };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
}

async function promptMessage(
    message: Message,
    author: User,
    time: number,
    validReactions: Array<EmojiResolvable>
): Promise<string> {
    time *= 1000;
    for (let re of validReactions) await message.react(re);

    const filter = (re, u) =>
        validReactions.includes(re.emoji.name) && author.id === message.author.id;
    return message
        .awaitReactions(filter, { max: 1, time: time })
        .then((coll) => coll.first() && coll.first().emoji.name);
}
