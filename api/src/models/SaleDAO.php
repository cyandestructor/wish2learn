<?php
    namespace W2l\Models;

    use W2l\Configuration\Database\DatabaseInterface;
    use W2l\Models\Dto\Sale;

    class SaleDAO
    {
        private $connection;
        
        public function __construct(DatabaseInterface $db)
        {
            $this->connection = $db->connect();
        }

        public function registerSale(Sale $sale)
        {
            $saleID = -1;

            $sql = 'CALL RegisterSale(?, ?, ?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $sale->productId,
                $sale->customerId,
                $sale->sellerId
            ]);

            $statement->bindColumn(1, $saleID, \PDO::PARAM_INT);
            $statement->fetch(\PDO::FETCH_BOUND);

            return $saleID;
        }

        public function getUserSales($userID)
        {
            $sales = [];

            $sql = 'CALL GetUserSales(?)';

            $statement = $this->connection->prepare($sql);
            $statement->execute([
                $userID
            ]);

            while($row = $statement->fetch()){
                $sale = new Sale();

                $sale->id = $row['id_sale'];
                $sale->productId = $row['product_id'];
                $sale->productPrice = $row['product_price'];
                $sale->date = $row['sale_date'];

                $sales[] = $sale;
            }

            return $sales;
        }
    }
    