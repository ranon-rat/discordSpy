// dependency
import * as discord from "discord.js";

export default function (msg: discord.Message): void {
  if (!msg.author.bot)
    console.log(`
    ${msg.guild.name}
    ${msg.author.username}
    ${msg.content}
`);
}
