<?php
    namespace W2l\Models;

    use W2l\Configuration\Database\DatabaseInterface;

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

                $statement->bindColumn(1, $userID, \PDO::PARAM_INT);
                $statement->fetch(\PDO::FETCH_BOUND);

            } catch (\PDOException $e) {
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

            } catch (\PDOException $e) {
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

            } catch (\PDOException $e) {
                error_log($e->getMessage());
                header('Content-Type: application/json', true, 500);
                die(json_encode(array('message' => 'A database method failed')));
            }
        }

        public function setAvatar($userID, $picture, $contentType)
        {
            try {
                $sql = 'CALL SetUserImage(?, ?, ?)';
            
                $statement = $this->connection->prepare($sql);
                
                $statement->execute([
                    $userID,
                    $picture,
                    $contentType
                ]);

            } catch (\PDOException $e) {
                error_log($e->getMessage());
                header('Content-Type: application/json', true, 500);
                die(json_encode(array('message' => 'A database method failed')));
            }
        }

        public function getAvatar($userID)
        {
            try {
                $sql = 'CALL GetUserImage(?)';
            
                $statement = $this->connection->prepare($sql);
                
                $statement->execute([
                    $userID
                ]);

                if($row = $statement->fetch()){
                    return array('data' => $row['user_image'], 'contentType' => $row['image_content_type']);
                }
                else{
                    return null;
                }

            } catch (\PDOException $e) {
                error_log($e->getMessage());
                header('Content-Type: application/json', true, 500);
                die(json_encode(array('message' => 'A database method failed')));
            }
        }

        public function deleteUser($userID)
        {
            $sql = 'CALL DeleteUser(?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $userID
            ]);
        }

        public function enrollUser($userID, $courseID)
        {
            $sql = 'CALL EnrollUser(?, ?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $userID,
                $courseID
            ]);
        }

        public function checkUser($username, $email)
        {
            $count = 0;

            $sql = 'CALL UserExists(?, ?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $username,
                $email
            ]);

            $statement->bindColumn(1, $count, \PDO::PARAM_INT);
            $statement->fetch(\PDO::FETCH_BOUND);

            return $count;
        }

        public function loginUser($input, $password)
        {
            $user = [];
            $sql = 'CALL UserLogin(?)';

            $statement = $this->connection->prepare($sql);
            $statement->execute([
                $input
            ]);

            if($row = $statement->fetch()){
                $user['id'] = $row['id_user'];
                $user['username'] = $row['username'];
                $user['role'] = $row['user_role'];
                $user['accountState'] = $row['account_state'];
                $hashedPassword = $row['user_password'];

                if(password_verify($password, $hashedPassword)){
                    return $user;
                }
            }
            
            return null;
        }
    }
    