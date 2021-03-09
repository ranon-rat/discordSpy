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
export async function madeApi(): Promise<BodyApi> {
  const db = openDatabase();
// idk why is dont function 😩
  var api: BodyApi = {
    channels: [],
    servers: [],
    users: [],
    messages: [],
    lenMessages: 0,
  };
  // im query the data but they isn't changing the value of api 
  db.all(`SELECT * FROM messages LIMIT 100`, (err: Error, row: Messages[]) =>
    err ? err : (api.messages = row)
  )
    .get(
      // so finally i can query the data but is didnt changing the value 
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
 * # this is the body of the api is only that
 * but the database its looks like this
 * 
 * 
 * |name | type|
 * |---|---|
    ID INTEGER      |    PRIMARY KEY,
    edit_or_delete  |     BIT  not null,
    serverID        |     VARCHAR(18) NOT NULL,
    serverName      |     VARCHAR(100) NOT NULL,     
    channelID       |     VARCHAR(18) NOT NULL,
    channelName     |     VARCHAR(100) NOT NULL, 
    userID          |     VARCHAR(18) NOT NULL,
    username        |     VARCHAR(32) NOT NULL,      
    messageID       |     VARCHAR(18) NOT NULL,
    message_content |     VARCHAR(2000) NOT NULL DEFAULT "embed"
    
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
// **message**
interface Messages {
  ID: number;
  edit_or_delete: boolean;
  // **server**
  serverID: string;
  serverName: string;
  //**channel**
  channelID: string;
  channelName: string;
  // **user**
  userID: string;
  username: string;
  // **message**
  messageID: string;
  message_content: string;
}
// api
