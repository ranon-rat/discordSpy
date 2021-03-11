// dependency
import * as discord from "discord.js";
import * as express from "express";
import getTheMessages from "./server/getTheMessages";
import { setupRouter} from "./server/serverExpress"
// settings
import { token } from "./setting.json";
// constants

const app = express();
const client = new discord.Client();
console.log("starting");
// messages
client.on("messageDelete", (msg) => {
  getTheMessages(msg, true);
});
client.on("messageUpdate", (msg) => {
  getTheMessages(msg, false);
});
app.use("/", setupRouter);
app.listen(8080 || process.env.PORT, () => console.log("starting server"));
client.login(token);
