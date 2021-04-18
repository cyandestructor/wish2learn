<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/config/DatabaseInterface.php');

    class UserDAO
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
                error_log($e->getMessage());
                $userID = -1;
            }

            return $userID;
        }

        public function getUser($userID)
        {
            $user = [];

            try {
                $sql = 'CALL GetUserInfo(?)';

                $statement = $this->connection->prepare($sql);
                $statement->bindParam(1, $userID);
                $statement->execute();

                if($row = $statement->fetch()){
                    $user['id'] = $row['id_user'];
                    $user['username'] = $row['username'];
                    $user['name'] = $row['account_name'];
                    $user['lastname'] = $row['account_lastname'];
                    $user['email'] = $row['user_email'];
                    $user['description'] = $row['user_description'];
                    $user['role'] = $row['user_role'];
                    $user['creationDate'] = $row['account_creation_date'];
                    $user['lastChangeDate'] = $row['last_change_date'];
                    $user['accountState'] = $row['account_state'];
                }
                else{
                    return null;
                }

            } catch (PDOException $e) {
                error_log($e->getMessage());
                header('Content-Type: application/json', true, 500);
                die(json_encode(array('message' => 'A database method failed')));
            }

            return $user;
        }

        public function editUser($user)
        {
            try {
                $sql = 'CALL EditUser(?, ?, ?, ?, ?, ?)';
            
                $statement = $this->connection->prepare($sql);
                
                $statement->execute([
                    $user['id'],
                    $user['username'],
                    $user['name'],
                    $user['lastname'],
                    $user['email'],
                    $user['description']
                ]);

            } catch (PDOException $e) {
                error_log($e->getMessage());
                header('Content-Type: application/json', true, 500);
                die(json_encode(array('message' => 'A database method failed')));
            }
        }
    }
    