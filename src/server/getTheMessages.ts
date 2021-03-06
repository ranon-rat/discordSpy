// dependency
import * as discord from "discord.js";
import * as communication from "./dataBaseCommunication";
//settings
import { myID } from "../setting.json";

export default function (
  msg: discord.Message,
  editOrEdit: boolean = true
): void {
  if (!msg.author.bot && myID != msg.author.id)
    communication.uploadDatabase(
      editOrEdit,
        msg.guild.id,
        msg.guild.name,
      
        msg.channel.id,
        msg.channel.name,
      
        msg.author.id,
        msg.author.username,
        
        msg.id,
        msg.content
    );
}
