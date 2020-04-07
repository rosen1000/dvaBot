"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const chalk = require("chalk");
const ascii = require("ascii-table");
const table = new ascii().setHeading("Command", "Status");
exports.load = (bot) => {
    const cmds = new Map();
    let dir = __dirname.split("/").slice(0, __dirname.split("/").length - 1).join("/");
    const cmdFolders = fs_1.readdirSync(dir + "/commands");
    console.log("Loading commands...");
    cmdFolders.forEach((folder) => {
        const cmdFiles = fs_1.readdirSync(`${dir}/commands/${folder}`).filter((c) => c.endsWith(".ts") || c.endsWith(".js"));
        for (let file of cmdFiles) {
            const pull = require(`${dir}/commands/${folder}/${file}`);
            const cmd = pull;
            if (cmd.name) {
                console.log(`${cmd.name} [${chalk.green("OK")}]`);
                cmds.set(cmd.name, cmd);
                if (cmd.aliases) {
                    cmd.aliases.forEach((alias) => {
                        console.log(`   ${alias} (alias) [${chalk.green("OK")}]`);
                        bot.aliases.set(alias, cmd.name);
                    });
                }
            }
            else {
                console.log(`${file} [${chalk.red("ERROR")}]`);
            }
        }
    });
    return cmds;
};
