// dependencies
import { Message } from "discord.js";
import * as Database from "better-sqlite3";
import * as Api from "./typesInterfaceClassAndOtherthings";
import { Response } from "express";

// this connect the server with the database

// this upload the info to the database
export async function uploadDatabase(editOrDelete: boolean, ...args: string[]) {
  const db = new Database(__dirname + "/database/database.db");
  db.prepare(
    `INSERT INTO messages(
              edit_or_delete, serverID      ,serverName,
              channelID     ,channelName    ,userID,
              username      ,messageID      ,message_content
              ) VALUES(
                ?,?,?,
                ?,?,?,
                ?,?,?)`
  ).run(editOrDelete ? 1 : 0, ...args);
   db.close();
}
//: Promise<Api.BodyApi> 
export async function madeApi(): Promise<Api.BodyApi> {
  const db = new Database(__dirname + "/database/database.db");

  let api: Api.BodyApi = {
    messages: db.prepare(`SELECT * FROM messages LIMIT 100;`).pluck().all(),
    servers: db
      .prepare(
        "SELECT DISTINCT serverID  as ID ,serverName as name FROM messages"
      )
      .pluck()
      .all(),
    channels: db
      .prepare(
        "SELECT DISTINCT channelID as ID, channelName as name FROM messages"
      )
      .pluck()
      .all(),
    users: db
      .prepare("SELECT DISTINCT  userID as ID , username as name FROM messages")
      .pluck()
      .all(),
    lenMessages: db
      .prepare("SELECT COUNT(*) AS lenMessages  FROM messages")
      .pluck()
      .get(),
  };

  // im query the data but they isn't changing the value of api

  db.close();
  return Promise.resolve(api);
}
/* .get(

   
   
    .all(
      "SELECT DISTINCT channelID as ID, channelName as name FROM messages",

      (err: Error, row: { ID: string; name: string }[]) =>
        err ? console.error(err.message) : (api.channels = row)
    )
    .each(
      // users
      "SELECT DISTINCT  userID as ID , username as name FROM messages",

      (err: Error, row: { ID: string; name: string }[]) =>
        err ? console.error(err.message) : (api.users = row)
    );
    );*/
