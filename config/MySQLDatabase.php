<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/config/DatabaseInterface.php');

    class MySQLDatabase implements DatabaseInterface
    {
        private $host = '';
        private $dbName = '';
        private $username = '';
        private $password = '';

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
                echo('Connection Error: ' . $e->getMessage());
            }

            return $this->connection;
        }
    }
    