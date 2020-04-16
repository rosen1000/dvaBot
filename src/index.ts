import { BotClient } from "./models/BotClient";
import * as dotenv from "dotenv";
dotenv.config();

new BotClient(process.env.TOKEN, process.env.DB);
