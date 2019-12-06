const Discord = require("discord.js");
const axios = require("axios");
module.exports = {
    name: "wfprice",
    category: "info",
    desc: "Check the prices for a item in warframe",
    use: "<item>",
    run: async (bot, message, args) => {
        let item = args.join("_").toLocaleLowerCase();
        if (!item) return message.channel.send("No item was given");
        axios.get(`https://api.warframe.market/v1/items/${item}/orders`).then(r => resolve(r, item, message)).catch((e) => {
            if (e) {
                message.channel.send("No item was found");
            }
        });
    }
}

let resolve = function(resolve, item, message) {
    let items = resolve.data.payload.orders.filter(it => it.visible == true && it.platform == "pc" && it.order_type == "sell" && it.user.status == "ingame");
    if (!items) return message.channel.send("No orders found for this item");
    let cheapest = items[0];
    for (let i = 0; i < items.length - 1; i++) {
        if (items[i].platinum < cheapest.platinum) {
            cheapest = items[i];
        }
    }

    item = item.split("_");
    for (let i = 0; i < item.length; i++) {
        item[i] = item[i].charAt(0).toUpperCase() + item[i].slice(1);
    }
    item = item.join(" ");

    let embed = new Discord.RichEmbed()
        .setColor(require("../../botconfig.json").color)
        .setTitle(item + " prices:")
        .addField("Username:", cheapest.user.ingame_name, true)
        .addField("Price:", cheapest.platinum, true)
        .addField("Status:", cheapest.user.status, true)
        .addField("Quantity:", cheapest.quantity)
        .addField("In-game command:", `/w ${cheapest.user.ingame_name} Hi! I want to buy: ${item} for ${cheapest.platinum} platinum. (warframe.market)`);
    message.channel.send(embed);
}