import * as Discord from "discord.js";

export {
    getMember,
    formatDate,
    promptMessage
};

function getMember(message: Discord.Message, id: Discord.Snowflake): Discord.GuildMember {
    let target: Discord.GuildMember;
    if (id) {
        id = id.toLowerCase();
        target = message.guild.members.cache.get(id);
    }

    if (!target && message.mentions.members) {
        target = message.mentions.members.first();
    } else if (!target && id) {
        target = message.guild.members.cache.find(m => {
            return (
                m.displayName.toLowerCase().includes(id) ||
                m.user.tag.toLowerCase().includes(id)
            );
        });
    }

    return target;
}

function formatDate(date: Date): string {
    let options = {
        dateStyle: "short",
        timeZone: "Europe/Sofia"
    };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
}

async function promptMessage(
    message: Discord.Message,
    author: Discord.User,
    time: number,
    validReactions: Array<Discord.EmojiResolvable>
): Promise<string> {
    time *= 1000;
    for (let re of validReactions) await message.react(re);

    const filter = (re, u) =>
        validReactions.includes(re.emoji.name) &&
        author.id === message.author.id;
    return message
        .awaitReactions(filter, { max: 1, time: time })
        .then(coll => coll.first() && coll.first().emoji.name);
}
