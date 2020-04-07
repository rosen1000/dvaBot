import { Client } from "discord.js";
import { Command } from "./Command";
import { load } from "../handlers/command";
import { readdirSync } from "fs";
import * as mongoose from "mongoose";
import connect from "../models/mongoose";
import { getUserDB } from "./user";
import { getMemberDB } from "./member";
import { getServerDB } from "./server";

export class BotClient extends Client {
    public commands: Map<string, Command>;
    public aliases: Map<string, string> = new Map();
    public categories: Array<string>;

    public readonly mongo: mongoose.Mongoose = mongoose;
    public readonly db = {
        user: getUserDB(this),
        member: getMemberDB(this),
        server: getServerDB(this),
    };

    private readonly path = __dirname
        .split("/")
        .slice(0, __dirname.split("/").length - 1)
        .join("/");

    constructor(token: any) {
        super();
        super.login(token);
        this.commands = this.getCommands();
        this.categories = readdirSync(this.path + "/commands");
        readdirSync(this.path + "/handlers/").forEach((file) => {
            if (file != "command.js")
                require(this.path + `/handlers/${file}`)(this);
        });
        connect(process.env.DB);
    }

    private getCommands(): Map<string, Command> {
        return (this.commands = load(this));
    }
}
