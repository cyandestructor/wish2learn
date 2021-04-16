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
            $userID = -1;
            
            try {
                $sql = 'CALL RegisterUser(?, ?, ?, ?, ?)';
            
                $statement = $this->connection->prepare($sql);
                
                $hashedPassword = password_hash($user['password'], PASSWORD_DEFAULT);
                
                $statement->execute([
                    $user['username'],
                    $user['name'],
                    $user['lastname'],
                    $user['email'],
                    $hashedPassword
                ]);

                $statement->bindColumn(1, $userID, PDO::PARAM_INT);
                $statement->fetch(PDO::FETCH_BOUND);

            } catch (PDOException $e) {
                echo($e->getMessage());
                $userID = -1;
            }

            return $userID;
        }
    }
    