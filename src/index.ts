// dependency
import * as discord from "discord.js";
import getTheMessages from "./server/getTheMessages";

// settings
import { token } from "./setting.json";
// constants
const client = new discord.Client();
// messages
client.on("messageDelete", getTheMessages);
client.on("messageUpdate", getTheMessages);
client.login(token);
