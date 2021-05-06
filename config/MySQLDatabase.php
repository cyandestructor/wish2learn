<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/config/DatabaseInterface.php');

    class MySQLDatabase implements DatabaseInterface
    {
        private $host = 'localhost';
        private $dbName = 'w2l_db_dev';
        private $username = 'root';
        private $password = 'PanicattheDisco1';

        private $connection;
        
        public function connect()
        {
            $this->connection = null;

            try {
                // Establish the connection
                $dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->dbName;
                $this->connection = new PDO($dsn, $this->username, $this->password);

                // Configure the PDO :
                // Throw an exception when an error occurs
                $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                // Fetch the data as an associative array
                $this->connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                error_log($e->getMessage());
                header('Content-Type: application/json', true, 500);
                die(json_encode(array('message' => 'Database connection failed')));
            }

            return $this->connection;
        }
    }
    