import * as Discord from "discord.js";
import axios from "axios";

module.exports = {
    name: "wftime",
    category: "info",
    desc: "Shows the time on Cetus and Orb Vallis",
    use: "[cetus/orb vallis]",
    enabled: true,
    run: async (bot, message, args) => {
        axios.get("http://api.warframestat.us/pc").then(resolve => {
            if (resolve.status == 200) {
                let place = args.join(" ");
                if (!place) place = "both";
                if (!["cetus", "orb vallis", "both"].includes(place.toLowerCase())) place = "both";
                
                let embed = new Discord.MessageEmbed().setColor(require("../../botconfig").color);
                let temp;
                switch (place) {
                    case "cetus":
                        temp = resolve.data.cetusCycle;
                        embed
                            .setTitle("Cetus:")
                            .addField("Expiry:", new Date(temp.expiry).toLocaleTimeString().replace(":00", ""))
                            .addField("State:", temp.state.capitalize())
                            .addField("Time left:", temp.timeLeft);
                        break;
                    case "orb vallis":
                        temp = resolve.data.vallisCycle;
                        embed
                            .setTitle("Orb Vallis:")
                            .addField("Expiry:", new Date(temp.expiry).toLocaleTimeString().replace(":00", ""))
                            .addField("State:", temp.isWarm ? "Warm" : "Cold")
                            .addField("Time left:", temp.timeLeft);
                        break;
                    case "both":
                        let cetus = resolve.data.cetusCycle;
                        let orb = resolve.data.vallisCycle;
                        embed
                            .setTitle("Times:")
                            .addField("Cetus:", `Expiry: ${new Date(cetus.expiry).toLocaleTimeString().replace(":00", "")}\nState: ${cetus.state.capitalize()}\nTime left: ${cetus.timeLeft}`)
                            .addField("Orb Vallis:", `Expiry: ${new Date(orb.expiry).toLocaleTimeString().replace(":00", "")}\nState: ${orb.isWarm ? "Warm" : "Cold"}\nTime left: ${orb.timeLeft}`);
                        break;
                }

                message.channel.send(embed);
            } else {
                message.channel.send("Error: " + resolve.status)
            }
        })
    }
}

// String.prototype.capitalize = function() {
//     return this.charAt(0).toUpperCase() + this.slice(1);
// }