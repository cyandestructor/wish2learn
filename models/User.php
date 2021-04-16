<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/config/DatabaseInterface.php');

    class User
    {
        private $connection;

        public function __construct(DatabaseInterface $db)
        {
            $this->connection = $db->connect();
        }

        public function register($user)
        {
            $sql = 'EXEC RegisterUser(?, ?, ?, ?, ?)';
            
            $statement = $this->connection->prepare($sql);
            $statement->execute([
                $user['username'],
                $user['name'],
                $user['lastname'],
                $user['email'],
                $user['password']
            ]);
        }
    }
    