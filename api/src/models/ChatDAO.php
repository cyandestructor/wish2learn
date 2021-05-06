<?php
    namespace Models;

    use Configuration\Database\DatabaseInterface;

    class ChatDAO
    {
        private $connection;
        
        public function __construct(DatabaseInterface $db)
        {
            $this->connection = $db->connect();
        }

        public function createChat(Chat $chat)
        {
            $chatID = -1;

            $sql = 'CALL CreateChat(?, ?, ?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $chat->senderId,
                $chat->receptorId,
                $chat->name
            ]);

            $statement->bindColumn(1, $chatID, \PDO::PARAM_INT);
            $statement->fetch(\PDO::FETCH_BOUND);

            return $chatID;
        }

        public function getUserChats($userID)
        {
            $chats = [];

            $sql = 'CALL GetUserChats(?)';

            $statement = $this->connection->prepare($sql);
            $statement->execute([
                $userID
            ]);

            while($row = $statement->fetch()){
                $chat = new Chat();

                $chat->id = $row['id_chat'];
                $chat->name = $row['chat_name'];

                $chats[] = $chat;
            }

            return $chats;
        }
    }
    