// dependencies
import * as sql from "sqlite3";
import { Response } from "express";
//constants
const sqlite = sql.verbose();

// this connect the server with the database
function openDatabase(): sql.Database {
  return new sql.Database(__dirname + "/database/database.db", (err) => {
    if (err) return console.error(err.message);
  });
}
// this upload the info to the database
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
export async function madeApi(w: Response) {
  let db = openDatabase();
  let api: BodyApi;

  db.each(`SELECT * FROM messages;`, async (row: sql.Statement, err: Error) => {
    // select all the messages
    if (err) return console.error(err.message);
    api.messages.push({
      // other stuff
      ID: row.ID as number, //id
      edit_or_delete: row.edit_or_delete as boolean, //
      //server
      serverID: row.serverID as string, // id
      serverName: row.serverName as string,
      //channel
      channelID: row.channelID as string, // id
      channelName: row.channelName as string,
      //user
      userID: row.userID as string, // id
      username: row.username as string,
      //message
      messageID: row.messageID as string, // id
      message_content: row.message_content as string,
    });
  })

    .each(
      "SELECT DISTINCT serverID,serverName FROM messages;",
      async (row: sql.Statement, err: Error) => {
        if (err) return console.error(err.message);
        api.servers.push({
          ID: row.serverID as string,
          name: row.serverName as string,
        });
      }
    )
    .each(
      "SELECT DISTINCT channelID, channelName  FROM ",
      async (row: sql.Statement, err: Error) => {
        if (err) return console.error(err.message);
        api.channels.push({
          ID: row.channelID,
          name: row.channelName,
        });
      }
    )
    .each("SELECT DISTINCT  userID, username FROM messages;", async (row: sql.Statement, err: Error) => { });
}
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

