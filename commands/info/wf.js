const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const WF = require("warframe-items");
const items = new WF();
let embed = new Discord.MessageEmbed();
const _ = require("lodash");

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
                Rarity: ${item.rarity},
                Base drain: ${item.baseDrain} (Max drain: ${item.baseDrain + item.fusionLimit})`
            );
            let drops = item.drops.sort((a, b) => b.chance - a.chance);
            for (var i = 0; i < (drops.length > 6 ? 6 : drops.length); i++)
                embed.addField(
                    drops[i].location,
                    `Rarity: ${drops[i].rarity},\nChance: ${drops[i].chance * 100}%`,
                    true
                );
            embed.setDescription(item.levelStats[item.levelStats.length - 1].stats);
            break;
        case "Primary":
            embed
                .addField(
                    "Damage: " + item.damage,
                    `Impact: ${item.damageTypes.impact},
                    Slash: ${item.damageTypes.slash},
                    Puncture: ${item.damageTypes.puncture}
                    Crit chance: ${item.criticalChance * 100}%,
                    Crit multplier: ${item.criticalMultiplier},
                    Status: ${Math.ceil(item.procChance * 100)}%,`,
                    true
                )
                .addField(
                    "Stats:",
                    `Magazine size: ${item.magazineSize},
                    Reload time: ${item.magazineSize},
                    Trigger: ${item.trigger},
                    Noice: ${item.noise}`,
                    true
                )
                .addField(
                    "Other:",
                    `Mastery rank: ${item.masteryReq},
                    Noise: ${item.noise},
                    Trigger: ${item.trigger}`
                );
            break;
        case "Secondary":
            embed
                .addField(
                    `Damage: ${item.damage}`,
                    `Impact: ${item.damageTypes.impact},
                    Slash: ${item.damageTypes.slash},
                    Puncture: ${item.damageTypes.puncture}`
                )
                .addField(
                    "Stats: ",
                    `Magazine size: ${item.magazineSize},
                    Reload time: ${item.magazineSize}
                    Crit chance: ${item.criticalChance}, Crit multplier: ${item.criticalMultiplier}
                    Trigger: ${item.trigger},
                    Noice: ${item.noice},`,
                    true
                )
                .addField("More info: ", `Mastery rank: ${item.masteryReq},`, true);
            break;
        case "Melee":
            embed = new Discord.RichEmbed()
                .setColor(botconfig.color)
                .setThumbnail(item.wikiaThumbnail)
                .setTitle(item.name)
                .setDescription(item.description)
                .addField(
                    `Damage: ${item.damage}`,
                    `Impact: ${item.damageTypes.impact},
                    Slash: ${item.damageTypes.slash},
                    Puncture: ${item.damageTypes.puncture}`
                )
                .addField(
                    "item stats:",
                    `Category: ${item.category}
                    Type: ${item.type}
                    Reload: ${item.reloadTime}
                    Trigger: ${item.trigger}
                    Accuracy: ${item.accuracy}
                    Crit chance and multiplier: ${item.criticalChance}, ${item.criticalMultiplier}`
                );
            message.channel.send(embed);
            break;
        case "Warframes":
            embed
                .addField(
                    "Properties: ",
                    `HP: ${item.health},
                    Shield: ${item.shield},
                    Armor: ${item.armor},
                    Energy: ${item.power}
                    Passive: ${item.passiveDescription}`
                )
                .addField(
                    "Abilities: ",
                    item.abilities.map((r) => `\`${r.name}\`: ${r.description}\n`).trim()
                )
                .addField(
                    "More info: ",
                    `Sex ${item.sex}, Mastery rank: ${item.masteryReq}, Sprint: ${item.sprint}`
                );
            break;
        default:
            message.channel.send("error");
            return;
    }
    message.channel.send(embed);
    embed = undefined;
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
