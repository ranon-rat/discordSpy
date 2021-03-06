CREATE TABLE messages(

    ID INTEGER          PRIMARY KEY,
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
);
