// dependencies
import { Message } from "discord.js";
import * as sql from "sqlite3";
import * as Api from "./typesInterfaceClassAndOtherthings";
import { Response } from "express";
//constants
const sqlite = sql.verbose();

// this connect the server with the database
function openDatabase(): sql.Database {
  return new sqlite.Database(__dirname + "/database/database.db", (err) => {
    if (err) return console.error(err);
  });
}
// this upload the info to the database
export async function uploadDatabase(editOrDelete: boolean, ...args: string[]) {
  const db = openDatabase();
  db.run(
    `INSERT INTO messages(
              edit_or_delete, serverID      ,serverName,
              channelID     ,channelName    ,userID,
              username      ,messageID      ,message_content
              ) VALUES(
                ?,?,?,
                ?,?,?,
                ?,?,?)`,
    [editOrDelete ? 1 : 0, ...args],
    (err: Error) => (err ? console.error(err.message) : null)
  );
  db.close();
}


export function madeApi(w: Response) {
  const db = openDatabase();
    db.all(`SELECT * FROM messages `, (err: Error, row: Api.Messages[]) =>
      err ? console.error(err.message) : w.send(row)
    );
  // im query the data but they isn't changing the value of api
  db.close();
}
   /* .get(
     db.all(
    "SELECT DISTINCT  userID as ID , username as name FROM messages",
    (err: Error, row: { ID: string; name: string }[]) =>
      err ? console.error(err.message) : w.send(row)
  );
      "SELECT COUNT(*) AS lenMessages  FROM messages",
      (err: Error, row: number) =>
        err ? console.error(err.message) : (api.lenMessages = row)
    )
    .all(
      "SELECT DISTINCT serverID  as ID ,serverName as name FROM messages",
      (err: Error, row: { ID: string; name: string }[]) =>
        err ? console.error(err.message) : (api.servers = row)
    )
    .all(
      "SELECT DISTINCT channelID as ID, channelName as name FROM messages",
      (err: Error, row: { ID: string; name: string }[]) =>
        err ? console.error(err.message) : (api.channels = row)
    )
    .all(
      "SELECT DISTINCT  userID as ID , username as name FROM messages",
      (err: Error, row: { ID: string; name: string }[]) =>
        err ? console.error(err.message) : w.send((api.users = row))
    );*/
