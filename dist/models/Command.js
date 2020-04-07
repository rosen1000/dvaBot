"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(client, data) {
        var _a, _b;
        this.client = client;
        this.name = data.name;
        this.aliases = (_a = data.aliases) !== null && _a !== void 0 ? _a : [];
        this.usage = (_b = data.usage) !== null && _b !== void 0 ? _b : "";
        this.description = data.description;
    }
    run(message, args) { }
}
exports.Command = Command;
