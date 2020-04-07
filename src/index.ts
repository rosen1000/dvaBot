import { BotClient } from "./models/BotClient";
const bot = new BotClient(process.env.TOKEN);
require("dotenv").config();
