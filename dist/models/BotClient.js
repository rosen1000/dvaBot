"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const command_1 = require("../handlers/command");
const fs_1 = require("fs");
class BotClient extends discord_js_1.Client {
    constructor(token) {
        super();
        this.aliases = new Map();
        this.path = __dirname
            .split("/")
            .slice(0, __dirname.split("/").length - 1)
            .join("/");
        super.login(token);
        this.commands = this.getCommands();
        this.categories = fs_1.readdirSync(this.path + "/commands");
        fs_1.readdirSync(this.path + "/handlers/").forEach(file => {
            if (file != "command.js")
                require(this.path + `/handlers/${file}`)(this);
        });
    }
    getCommands() {
        return (this.commands = command_1.load(this));
    }
}
exports.BotClient = BotClient;
