const fs = require("fs");
const ascii = require("ascii-table");
const table = new ascii().setHeading("Command", "Status");

module.exports = (bot) => {
    //Get commands folder
    fs.readdirSync("../commands/").forEach(dir => {
        //And get every category
        const commands = readdirSync(`./commands/${dir}`).filter(f => f.endsWith(".js"));

        //Start setting up commands
        for (let file of commands) {
            //Get each command
            let pull = require(`../commands/${dir}/${file}`);
            if (pull.name) {
                //Add it to the commands
                bot.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                //If the command file is not setted up as it should be
                table.addRow(file, '❌');
            }

            //Check for aliases
            if (pull.aliases && Array.isArray(pull))
                pull.aliases.forEach(al => bot.aliases.set(al, pull.name));
        }
    });
}