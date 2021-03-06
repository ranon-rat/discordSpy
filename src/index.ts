// dependency
import * as discord from "discord.js";
import getTheMessages from "./server/getTheMessages";

// settings
import { token } from "./setting.json";
// constants
const client = new discord.Client();
console.log("starting");
// messages
client.on("messageDelete", (msg) => {
  console.log("delete message");
  getTheMessages(msg, true);
});
client.on("messageUpdate", (msg) => {
  console.log("edit message");
  getTheMessages(msg, false);
});

client.login(token);
