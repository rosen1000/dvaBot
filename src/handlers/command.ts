import { BotClient } from "../models/BotClient";
import { Command } from "../models/Command";
import { readdirSync } from "fs";
import * as chalk from "chalk";

const ascii = require("ascii-table");
const table = new ascii().setHeading("Command", "Status");

export const load = (bot: BotClient): Map<string, Command> => {
    const cmds: Map<string, Command> = new Map();
    let dir = __dirname
        .split("/")
        .slice(0, __dirname.split("/").length - 1)
        .join("/");
    const cmdFolders: Array<string> = readdirSync(dir + "/commands");
    console.log("Loading commands...");

    cmdFolders.forEach((folder) => {
        readdirSync(`${dir}/commands/${folder}`)
            .filter((file) => file.endsWith(".js"))
            .map(async (fileName) => {
                let pull = await import(
                    `${dir}/commands/${folder}/${fileName}`
                );
                let file: Command = new pull(bot);
                if (file.name) {
                    cmds.set(file.name, file);
                    console.log(`├──${fileName} [${chalk.green("OK")}]`);
                    if (file.aliases) {
                        file.aliases.forEach((alias) => {
                            bot.aliases.set(alias, file.name);
                            console.log(
                                `│   ├──${alias} [${chalk.green("OK")}]`
                            );
                        });
                    }
                } else {
                    console.log(`├──${fileName} [${chalk.red("ERROR")}]`);
                }
            });
    });
    // cmdFolders.forEach((folder: string) => {
    // const cmdFiles: Array<string> = readdirSync(
    //     `${dir}/commands/${folder}`
    // ).filter((c: string) => c.endsWith(".ts") || c.endsWith(".js"));
    // for (let file of cmdFiles) {
    //     const pull = require(`${dir}/commands/${folder}/${file}`);
    //     const cmd: Command = pull//(bot);

    //     if (cmd.name) {
    //         console.log(`${cmd.name} [${chalk.green("OK")}]`)
    //         cmds.set(cmd.name, cmd);
    //         if (cmd.aliases) {
    //             cmd.aliases.forEach((alias: string) => {
    //                 console.log(`   ${alias} (alias) [${chalk.green("OK")}]`)
    //                 bot.aliases.set(alias, cmd.name);
    //             });
    //         }
    //     } else {
    //         console.log(`${file} [${chalk.red("ERROR")}]`);
    //     }
    // }
    // });

    return cmds;
};

// module.exports = (bot) => {
//     //Get commands folder
//     fs.readdirSync("./commands/").forEach(dir => {
//         //And get every category
//         const commands = fs.readdirSync(`./commands/${dir}`).filter(f => f.endsWith(".ts"));

//         //Start setting up commands
//         for (let file of commands) {
//             //Get each command
//             let pull = require(`../commands/${dir}/${file}`);
//             if (pull.name) {
//                 //Add it to the commands
//                 bot.commands.set(pull.name, pull);
//                 table.addRow(file, '✅');
//             } else {
//                 //If the command file is not setted up as it should be
//                 table.addRow(file, '❌');
//             }

//             //Check for aliases
//             if (pull.aliases && Array.isArray(pull.aliases))
//                 pull.aliases.forEach(al => bot.aliases.set(al, pull.name));
//         }
//     });

//     console.log(table.toString());
// }
