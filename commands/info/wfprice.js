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

        axios.get(`https://api.warframe.market/v1/items/${item}/orders/`).then(resolve(this, item, message)).catch((e) => {
            if (e) {
                axios.get(`https://api.warframe.market/v1/items/${item}_blueprint/order/`).then(resolve(this , item, message)).catch((e) => {
                    if (e) {
                        message.channel.send("No item was found");
                    }
                })
            }
        });
    }
}

let resolve = function(resolve, item, message) {
    let items = resolve.payload.orders.filter(it => it.visible == true && it.platform == "pc" && it.order_type == "sell" && it.user.status != "offline");
    for (let i = 0; i < items.length; i++) {
        for (let j = 1; j < i; i++) {
            if (items[i].platinum < items[j].platinum) {
                let temp = items[i];
                items[i] = items[j];
                items[j] = temp;
            }
        }
    }

    let embed = new Discord.RichEmbed()
        .setColor(require("../../botconfig.json").color)
        .setTitle(item.split("_").join(" ").toUpperCase() + " prices:")
        .addField("Username:", items[0].user.ingame_name, true)
        .addField("Price:", items[0].platinum, true)
        .addField("Status:", items[0].user.status, true)
        .addField("Quantity:", items[0].quantity);
    message.channel.send(embed);
}