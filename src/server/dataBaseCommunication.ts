import * as sql from "sqlite3";
const sqlite = sql.verbose();

/**
  * 
    ID INTEGER PRIMARY KEY,
    -- IF IS DELETED THE VALUE IS 1 ELSE 0 
    edit_or_delete BIT not null,
    -- server
    serverID VARCHAR(18) NOT NULL,
    serverName VARCHAR(100) NOT NULL
    -- chanel
    channelID VARCHAR(18) NOT NULL,
    channelName VARCHAR(100) NOT NULL,
    -- message 
    messageID VARCHAR(18) NOT NULL,
    message_content VARCHAR(2000) NOT NULL DEFAULT "embed"
  */
function openDatabase(): sql.Database {
  return new sql.Database("../database/database.db", (err) => {
    if (err) return console.error(err.message);
  });
}
export function uploadDatabase(editOrDelete: boolean, ...args: string[]): void {
  let db = openDatabase();
  db.run(
    `INSERT INTO messages(edit_or_delete,
              serverID    ,
              serverName  ,
              channelID   ,
              channelName ,
              messageID   ,
              message_content) VALUES(?,?,?,?,?,?,?)`,
    [editOrDelete, ...args],
    (err: Error) => {
      if (err) return console.error(err.message);
    }
  );
  db.close();
}
