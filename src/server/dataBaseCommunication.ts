import * as sql from "sqlite3";
const sqlite = sql.verbose();

function openDatabase(): sql.Database {
  return new sql.Database(__dirname + "/database/database.db", (err) => {
    if (err) return console.error(err.message);
  });
}
export async function uploadDatabase(editOrDelete: boolean, ...args: string[]) {
  let db = openDatabase();
  db.run(
    `INSERT INTO messages(
              edit_or_delete,
              serverID    ,serverName  ,
              channelID   ,channelName ,
              userID      ,username,
              messageID   ,message_content
              ) VALUES(
                ?,?,?,
                ?,?,?,
                ?,?,?)`,
    [editOrDelete ? 1 : 0, ...args],
    (err: Error) => {
      if (err) return console.error(err.message);
    }
  );
  db.close();
}
export async function madeApi() {}

interface Messages {
  id: number;
  edit_or_delete: boolean;
  serverID: string;
  serverName: string;
  channelID: string;
  channelName: string;
  userID: string;
  username: string;
  messageID: string;
  message_content: string;
}
interface BodyApi {
  servers: {
    ID: string;
    name: string;
  }[];
  channels: {
    ID: string;
    name: string;
  }[];
  users: {
    ID: string;
    name: string;
  };
  messages: Messages[];
}
