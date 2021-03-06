CREATE TABLE messages(
    ID INTEGER PRIMARY KEY,
    edit_or_delete BIT not null,
    -- IF IS DELETED THE VALUE IS 1 ELSE 0 
    serverID INTEGER NOT NULL,
    serverName VARCHAR(100) NOT NULL
    channelID INTEGER NOT NULL,
    channelName VARCHAR(100) NOT NULL,
    messageID INTEGER NOT NULL,
    message_content VARCHAR(2000) NOT NULL DEFAULT "embed"
);
