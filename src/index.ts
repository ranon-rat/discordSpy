import * as discord from "discord.js";
import { token } from "./setting.json";
const client = new discord.Client();
client.login(token);
