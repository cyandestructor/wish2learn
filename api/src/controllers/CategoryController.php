<?php
    namespace Controllers;

    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    
    use Configuration\Database\MySQLDatabase;
    
    use Validators\CategoryValidator;
    use Models\Category;
    use Models\CategoryDAO;

    class CategoryController
    {
        static public function postCategory(Request $request, Response $response, $args)
        {
            $contentType = $request->getHeaderLine('Content-Type');
            if(!$contentType || $contentType != 'application/json'){
                return $response
                            ->withStatus(415);
            }

            $result = [];
            $data = $request->getParsedBody();

            // Category data validation
            $validation = new CategoryValidator($data);
            $errors = $validation->validateForm();
            if (count($errors) > 0) {
                $result['message'] = 'Input is not valid or is incorrect';
                $result['errors'] = $errors;
                $response->getBody()->write(json_encode($result));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(400);
            }

            // Category creation
            $categoryDAO = new CategoryDAO(new MySQLDatabase());

            $category = new Category();
            $category->name = $data['name'];
            $category->description = $data['description'];

            $result['id'] = $categoryDAO->createCategory($category);
            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json')
                        ->withStatus(201);
        }

        static public function putCategory(Request $request, Response $response, $args)
        {
            $contentType = $request->getHeaderLine('Content-Type');
            if(!$contentType || $contentType != 'application/json'){
                return $response
                            ->withStatus(415);
            }

            $result = [];

            $categoryID = $request->getAttribute('id');

            $categoryDAO = new CategoryDAO(new MySQLDatabase());

            // Get the original data
            $original = $categoryDAO->getCategory($categoryID);
            if(!$original){
                $result['message'] = 'Category does not exist';
                $response->getBody()->write(json_encode($result));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(404);
            }

            // Get new data and validate
            $data = $request->getParsedBody();
            
            $data['name'] = $data['name'] ?? $original->name;
            $data['description'] = $data['description'] ?? $original->description;
            
            // Category data validation
            $validation = new CategoryValidator($data);
            $errors = $validation->validateForm();
            if (count($errors) > 0) {
                $result['message'] = 'Input is not valid or is incorrect';
                $result['errors'] = $errors;
                $response->getBody()->write(json_encode($result));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(400);
            }

            // Course edition
            $categoryData = new Category();
            $categoryData->id = $categoryID;
            $categoryData->name = $data['name'];
            $categoryData->description = $data['description'];

            $categoryDAO->editCategory($categoryData);

            // Prepare the return data
            $result['old'] = [
                'id' => $original->id,
                'name' => $original->name,
                'description' => $original->description
            ];

            $result['new'] = [
                'id' => $categoryData->id,
                'name' => $categoryData->name,
                'description' => $categoryData->description
            ];
            
            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json')
                        ->withStatus(201);
        }

        static public function deleteCategory(Request $request, Response $response, $args)
        {
            $categoryID = $request->getAttribute('id');

            $categoryDAO = new CategoryDAO(new MySQLDatabase());
            $categoryDAO->deleteCategory($categoryID);

            return $response;
        }

        static public function getUnique(Request $request, Response $response, $args)
        {
            $categoryID = $request->getAttribute('id');

            $categoryDAO = new CategoryDAO(new MySQLDatabase());
            $category = $categoryDAO->getCategory($categoryID);

            if(!$category){
                return $response
                            ->withStatus(404);
            }

            $result = [];
            $result['id'] = $category->id;
            $result['name'] = $category->name;
            $result['description'] = $category->description;

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }

        static public function getList(Request $request, Response $response, $args)
        {
            $queryParams = $request->getQueryParams();

            if(!isset($queryParams['count'])){
                $response->getBody()->write(json_encode([
                    'message' => 'Parameter "count" must be defined'
                    ]));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(400);
            }

            if(!is_numeric($queryParams['count']) || $queryParams['count'] < 0){
                $response->getBody()->write(json_encode([
                    'message' => 'Parameter "count" must be a positive number'
                    ]));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(400);
            }

            $limit = $queryParams['count'];
            $page = $queryParams['page'] ?? 1;

            if(!is_numeric($page) || $page < 0){
                $response->getBody()->write(json_encode([
                    'message' => 'Parameter "page" must be a positive number'
                ]));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(400);
            }

            $offset = ($page - 1) * $limit;
            
            $categoryDAO = new CategoryDAO(new MySQLDatabase());

            $categories = $categoryDAO->getCategories($limit, $offset);

            $result = [];
            foreach ($categories as $category) {
                $element = [];

                $element['id'] = $category->id;
                $element['name'] = $category->name;
                $element['description'] = $category->description;

                $result[] = $element;
            }

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }

        static public function getCourseCategories(Request $request, Response $response, $args)
        {
            $courseID = $request->getAttribute('id');

            $categoryDAO = new CategoryDAO(new MySQLDatabase());

            $categories = $categoryDAO->getCourseCategories($courseID);

            $result = [];
            foreach ($categories as $category) {
                $element = [];

                $element['id'] = $category->id;
                $element['name'] = $category->name;
                $element['description'] = $category->description;

                $result[] = $element;
            }

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }
    }
    