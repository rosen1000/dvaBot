const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const WF = require("warframe-items");
const items = new WF();
let embed = new Discord.MessageEmbed();

module.exports.run = async (bot, message, args) => {
    // return message.channel.send("Disabled!");
    let item = items.find((r) => r.name.toLowerCase() == args.join(" ").toLowerCase());
    if (!item) return message.channel.send("Not found");
    build(item, message);

    switch (item.category) {
        case "Mods":
            embed.addField(
                "Info:",
                `\`${item.type}\` with \`${item.polarity}\` polarity
                Rarity: ${item.rarity}
                Base drain: ${item.baseDrain} (Max drain: ${item.baseDrain + item.fusionLimit})`
            );
            let drops = item.drops.sort((a, b) => b.chance - a.chance);
            for (var i = 0; i < (drops.length > 6 ? 6 : drops.length); i++)
                embed.addField(
                    drops[i].location,
                    `Rarity: ${drops[i].rarity},\nChance: ${chance(drops[i].chance)}%`,
                    true
                )
                .addField(
                    "Other:",
                    `Mastery rank: ${item.masteryReq},
                    Noise: ${item.noise},
                    Trigger: ${item.trigger}`
                );
            embed.setDescription(item.levelStats[item.levelStats.length - 1].stats);
            break;
        case "Primary":
        case "Secondary":
            embed
                .setDescription(item.description)
                .addField(
                    `Damage: ${item.damage}`,
                    `${damageTypes(item.damageTypes)}
                    Crit chance: ${chance(item.criticalChance)}%
                    Crit multplier: ${item.criticalMultiplier}x
                    Status: ${chance(item.procChance)}%`,
                    true
                )
                .addField(
                    "Other:",
                    `Type: ${item.type}
                    Magazine size: ${item.magazineSize}/${item.ammo}
                    Reload time: ${item.reloadTime}
                    Fire Rate: ${item.fireRate}
                    Mastery rank: ${item.masteryReq}
                    Noise: ${item.noise}
                    Trigger: ${item.trigger}
                    Disposition: ${item.disposition}`,
                    true
                );
            break;
        case "Melee":
            embed
                .setDescription(item.description)
                .addField(
                    `Damage: ${item.damage}`,
                    `${damageTypes(item.damageTypes)}
                    Crit chance: ${chance(item.criticalChance)}%
                    Crit multplier: ${item.criticalMultiplier}x
                    Status: ${chance(item.procChance)}%`,
                    true
                )
                .addField(
                    "Other:",
                    `Type: ${item.type}
                    Attack speed: ${item.fireRate}
                    Range: ${item.range}
                    Mastery rank: ${item.masteryReq}
                    Disposition: ${item.disposition}`,
                    true
                );
            break;
        case "Warframes":
            embed
                .addField(
                    "Properties: ",
                    `HP: ${item.health} (${item.health * 3})
                    Shield: ${item.shield} (${item.shield * 3})
                    Armor: ${item.armor}
                    Energy: ${item.power} (${item.power * .5})
                    Passive: ${item.passiveDescription}`
                )
                .addField(
                    "Abilities: ",
                    item.abilities.map((r) => `\`${r.name}\`: ${r.description}\n`)
                )
                .addField(
                    "More info: ",
                    `Sex: ${item.sex}
                    Mastery rank: ${item.masteryReq}
                    Sprint: ${item.sprint}`
                );
            break;
        default:
            message.channel.send("error");
            return;
    }
    message.channel.send(embed);
    embed = new Discord.MessageEmbed();
};

module.exports.help = {
    name: "wf",
    type: "info",
    desc: "Check on warframe items, mods, warframes and more!",
    use: "wf <args>",
};

function build(item, message) {
    embed
        .setColor(botconfig.color)
        .setThumbnail(`https://cdn.warframestat.us/img/${item.imageName}`)
        .setTitle(item.name)
        .setURL(item.wikiaUrl)
        .setDescription(item.description);
}

function chance(number) {
    return +(number * 100).toFixed(2);
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function damageTypes(damages) {
    let output = "";
    for (let dmg in damages) {
        output += `${capitalize(dmg)}: ${damages[dmg]}\n`;
    }
    return output.trim();
}
