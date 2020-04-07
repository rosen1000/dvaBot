import * as mongoose from "mongoose";
import { BotClient } from "./BotClient";

export interface UserInterface extends mongoose.Document {
    id: string;
}

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
});

export function getUserDB(bot: BotClient) {
    const User = bot.mongo.model("user", userSchema);
    return User;
}
