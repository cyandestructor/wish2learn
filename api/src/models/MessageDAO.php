<?php
    namespace Models;

    use Configuration\Database\DatabaseInterface;

    class MessageDAO
    {
        private $connection;
        
        public function __construct(DatabaseInterface $db)
        {
            $this->connection = $db->connect();
        }

        public function createMessage(Message $message)
        {
            $messageID = -1;

            $sql = 'CALL CreateMessage(?, ?, ?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $message->senderId,
                $message->chatId,
                $message->body
            ]);

            $statement->bindColumn(1, $messageID, \PDO::PARAM_INT);
            $statement->fetch(\PDO::FETCH_BOUND);

            return $messageID;
        }

        public function getChatMessages($chatID)
        {
            $messages = [];

            $sql = 'CALL GetChatMessages(?)';

            $statement = $this->connection->prepare($sql);
            $statement->execute([
                $chatID
            ]);

            while($row = $statement->fetch()){
                $message = new Message();

                $message->id = $row['id_message'];
                $message->body = $row['message_body'];
                $message->date = $row['message_date'];
                $message->senderId = $row['sender_id'];
                $message->senderName = $row['sender_name'];
                $message->chatId = $row['chat_id'];

                $messages[] = $category;
            }

            return $messages;
        }
    }
    