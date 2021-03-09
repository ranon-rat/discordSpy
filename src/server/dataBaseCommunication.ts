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
  };
  ///////////// messageS\\\\\\\\\\\\\\\\\\\\\\\\\\\
  db.get(`SELECT * FROM messages`, (err: Error, row: Messages) => {
    if (err) return Promise.reject(err);

    api.messages.push({
      // other stuff
      ID: row.ID, //id
      edit_or_delete: row.edit_or_delete, //
      //server
      serverID: row.serverID, // id
      serverName: row.serverName,
      //channel
      channelID: row.channelID, // id
      channelName: row.channelName,
      //user
      userID: row.userID, // id
      username: row.username,
      //message
      messageID: row.messageID, // id
      message_content: row.message_content,
    });
  });
  /////////////// SERVER\\\\\\\\\\\\\\\\\\

   db. each(
    "SELECT DISTINCT serverID,serverName FROM messages",
    (err: Error, row: Messages) => {
      if (err) return Promise.reject(err);
      // servers
      api.servers.push({
        ID: row.serverID,
        name: row.serverName,
      });
    }
  );
  /////////////CHANNELS\\\\\\\\\\\\\\\\
 db.get(
    "SELECT DISTINCT channelID, channelName  FROM messages;",

   (err: Error, row: {channelID:string,channelName:string}) =>
   {
      if (err) return Promise.reject(err);

      api.channels.push({ ID: row.channelID, name: row.channelName });
    }
  );
  ////////////USERS\\\\\\\\\\
 db.get(
    // users
    "SELECT DISTINCT  userID, username FROM messages",
   (err: Error, row: {userID:string,username:string}) => {
      if (err) return Promise.reject(err);
      console.log(row)
      // users
      api.users.push({
        ID: row.userID,
        name: row.username,
      });
    }
  );
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
