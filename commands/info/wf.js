const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const WF = require("warframe-items");
const items = new WF();
let embed;

module.exports.run = async (bot, message, args) => {
    return message.channel.send("Disabled!");
    // console.log(items.find(r => r.name == args.join(" ")));
    let item = items.find((r) => r.name == args.join(" "));
    if (!item) return message.channel.send("Not found");

    switch (item.category) {
        case "Mods":
            embed = new Discord.RichEmbed()
                .setColor(botconfig.color)
                .setThumbnail(`https://cdn.warframestat.us/img/${item.imageName}`)
                .setTitle(item.name)
                .setDescription(item.description)
                .addField(
                    "Info:",
                    `Mod for \`${item.type}\` with polarity \`${item.polarity}\` Rarity: ${item.rarity}` +
                        `\n Base drain: ${item.baseDrain} and fusion limit: ${
                            item.fusionLimit
                        } (Maxed: ${item.baseDrain + item.fusionLimit})`
                );
            for (var i = 0; i < item.drops.length; i++) {
                embed.addField(
                    item.drops[i].location,
                    `Type: ${item.drops[i].type}, Rarity: ${item.drops[i].rarity}, Chance: ${item.drops[i].chance}`
                );
                if (i == 20) break;
            }
            break;
        case "Primary":
            embed = new Discord.RichEmbed()
                .setColor(botconfig.color)
                .setThumbnail(item.wikiaThumbnail)
                .setTitle(item.name)
                .setDescription(item.description)
                .addField(
                    "Damage: " + item.damage,
                    `Impact: ${item.damageTypes.impact}, Slash: ${item.damageTypes.slash}, Puncture: ${item.damageTypes.puncture}`,
                    true
                )
                .addField(
                    "Stats: ",
                    `Magazine size: ${item.magazineSize}, Reload time: ${item.magazineSize}` +
                        `\nCrit chance: ${item.criticalChance}, Crit multplier: ${item.criticalMultiplier}` +
                        `\nTrigger: ${item.trigger}, Noice: ${item.noice},`,
                    true
                );
            break;
        case "Secondary":
            embed = new Discord.RichEmbed()
                .setColor(botconfig.color)
                .setThumbnail(item.wikiaThumbnail)
                .setTitle(item.name)
                .setDescription(item.description)
                .addField(
                    `Damage: ${item.damage}`,
                    `Impact: ${item.damageTypes.impact}, Slash: ${item.damageTypes.slash}, Puncture: ${item.damageTypes.puncture}`
                )
                .addField(
                    "Stats: ",
                    `Magazine size: ${item.magazineSize}, Reload time: ${item.magazineSize}` +
                        `\nCrit chance: ${item.criticalChance}, Crit multplier: ${item.criticalMultiplier}` +
                        `\nTrigger: ${item.trigger}, Noice: ${item.noice},`,
                    true
                )
                .addField("More info: ", `Mastery rank: ${item.masteryReq}, `, true);
            break;
        case "Melee":
            embed = new Discord.RichEmbed()
                .setColor(botconfig.color)
                .setThumbnail(item.wikiaThumbnail)
                .setTitle(item.name)
                .setDescription(item.description)
                .addField(
                    `Damage: ${item.damage}`,
                    `Impact: ${item.damageTypes.impact}, Slash: ${item.damageTypes.slash}, Puncture: ${item.damageTypes.puncture}`,
                    true
                )
                .addField(
                    "item stats:",
                    `Category: ${item.category}\nType: ${item.type}\nReload: ${item.reloadTime}\nTrigger: ${item.trigger}\nAccuracy: ${item.accuracy}\nCrit chance and multiplier: ${item.criticalChance}, ${item.criticalMultiplier}`,
                    true
                );
            message.channel.send(embed);
            break;
        case "Warframes":
            embed = new Discord.RichEmbed()
                .setColor(botconfig.color)
                .setThumbnail(item.wikiaThumbnail)
                .setTitle(item.name)
                .setDescription(item.description)
                .addField(
                    "Properties: ",
                    `HP: ${item.health}, Shield: ${item.shield}, Armor: ${item.armor}, Power: ${item.power}\nPassive: ${item.passiveDescription}`,
                    true
                )
                .addField(
                    "Abilities: ",
                    item.abilities.map((r) => `\`${r.name}\`: ${r.description}\n`),
                    true
                )
                .addField(
                    "More info: ",
                    `Sex ${item.sex}, Mastery rank: ${item.masteryReq}, Sprint: ${item.sprint}`,
                    true
                );
            break;
        default:
            message.channel.send("error");
            return;
    }
    message.channel.send(embed);
};

module.exports.help = {
    name: "wf",
    type: "info",
    desc: "Warframe commands use ?wf help for help of all wf commands",
    use: "wf <command> [args]",
};
