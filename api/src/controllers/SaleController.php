<?php
    namespace W2l\Controllers;
    
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    
    use W2l\Configuration\Database\MySQLDatabase;
    
    use W2l\Models\Dto\Sale;
    use W2l\Models\SaleDAO;

    class SaleController
    {
        static public function postSale(Request $request, Response $response, $args)
        {
            $contentType = $request->getHeaderLine('Content-Type');
            if(!$contentType || $contentType != 'application/json'){
                return $response
                            ->withStatus(415);
            }

            $result = [];
            $data = $request->getParsedBody();

            // Certificate creation
            $saleDAO = new SaleDAO(new MySQLDatabase());

            $sale = new Sale();
            $sale->customerId = $data['customerId'];
            $sale->sellerId = $data['sellerId'];
            $sale->productId = $data['productId'];

            $result['id'] = $saleDAO->registerSale($sale);
            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json')
                        ->withStatus(201);
        }

        static public function getUserSales(Request $request, Response $response, $args)
        {
            $userID = $request->getAttribute('id');

            $queryParams = $request->getQueryParams();

            $isResume = isset($queryParams['resume']) && strtolower($queryParams['resume']) == 'true';

            $saleDAO = new SaleDAO(new MySQLDatabase());

            $result;

            if($isResume){
                $sales = $saleDAO->getUserSalesResume($userID);
                $result = SaleController::computeUsersSalesResume($sales);
            }
            else{
                $sales = $saleDAO->getUserSales($userID);
                $result = SaleController::computeUsersSales($sales);
            }
            
            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }

        static private function computeUsersSales($sales)
        {
            $result = [];

            $totalSales = 0;
            $resultSales = [];

            foreach ($sales as $sale) {
                $element = [];

                $element['id'] = $sale->id;
                $element['productId'] = $sale->productId;
                $element['productPrice'] = $sale->productPrice;
                $element['productName'] = $sale->productName;
                $element['date'] = $sale->date;

                $resultSales[] = $element;

                $totalSales += $sale->productPrice;
            }

            $result['totalSales'] = $totalSales;
            $result['sales'] = $resultSales;

            return $result;
        }

        static private function computeUsersSalesResume($sales)
        {
            $result = [];

            $totalSales = 0;
            $resultSales = [];

            foreach ($sales as $sale) {
                $element = [];

                $element['productId'] = $sale->productId;
                $element['productPrice'] = $sale->productPrice;
                $element['productName'] = $sale->productName;
                $element['productTotal'] = $sale->productTotalSales;

                $resultSales[] = $element;

                $totalSales += $sale->productTotalSales;
            }

            $result['totalSales'] = $totalSales;
            $result['sales'] = $resultSales;

            return $result;
        }
    }
    