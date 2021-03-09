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
export interface BodyApi {
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
export interface Messages {
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
