// dependencies
import { Message } from "discord.js";
import * as sql from "sqlite3";
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
export async function madeApi(): Promise<BodyApi> {
  const db = openDatabase();

  var api: BodyApi = {
    channels: [],
    servers: [],
    users: [],
    messages: [],
    lenMessages: 0,
  };
  db.all(`SELECT * FROM messages LIMIT 100`, (err: Error, row: Messages[]) =>
    err ? err : (api.messages = row)
  )
    .get(
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
    .each(
      "SELECT DISTINCT  userID as ID , username as name FROM messages",
      (err: Error, row: { ID: string; name: string }[]) => {
        err ? console.error(err.message) : (api.users = row);      
      }
  );
  db.close();
  return Promise.resolve(api);

}

//////////DATABASE BODY\\\\\\\\\\\\\\\\
/**
 *     ID INTEGER          PRIMARY KEY,
    -- IF IS DELETED THE VALUE IS 1 ELSE 0 
    edit_or_delete       BIT  not null,
    -- server
    serverID             VARCHAR(18) NOT NULL,
    serverName           VARCHAR(100) NOT NULL,
    -- channel            
    channelID            VARCHAR(18) NOT NULL,
    channelName          VARCHAR(100) NOT NULL, 
    -- user
    userID               VARCHAR(18) NOT NULL,
    username             VARCHAR(32) NOT NULL,
    -- message              
    messageID            VARCHAR(18) NOT NULL,
    message_content      VARCHAR(2000) NOT NULL DEFAULT "embed"
 */

/**
 * THIS IS THE **BODY** OF THE DATABASE ONLY THAT
 */
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
  }[];
  lenMessages: number;
  messages: Messages[];
}
// messages
interface Messages {
  ID: number;
  edit_or_delete: boolean;
  // server
  serverID: string;
  serverName: string;
  //channel
  channelID: string;
  channelName: string;
  // user
  userID: string;
  username: string;
  // message
  messageID: string;
  message_content: string;
}
// api
