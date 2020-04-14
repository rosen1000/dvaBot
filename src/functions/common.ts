import { Message, GuildMember, User, EmojiResolvable } from "discord.js";

export { getMember, formatDate, promptMessage };

function getMember(message: Message, id: string[]): GuildMember {
    let target: GuildMember;
    if (id) {
        target = message.guild.members.cache.get(id[0]);
    }
    if (!target && message.mentions.members) {
        target = message.mentions.members.first();
    }
    if (!target && id) {
        target = message.guild.members.cache.find((m) => {
            return m.displayName.includes(id.join(" "));
        });
    }

    return target;
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
        validReactions.includes(re.emoji.name) &&
        author.id === message.author.id;
    return message
        .awaitReactions(filter, { max: 1, time: time })
        .then((coll) => coll.first() && coll.first().emoji.name);
}
