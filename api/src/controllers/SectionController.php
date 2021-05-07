<?php
    namespace Controllers;

    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    
    use Configuration\Database\MySQLDatabase;

    use Validators\SectionValidator;
    use Models\Section;
    use Models\SectionDAO;

    class SectionController
    {
        static public function postSection(Request $request, Response $response, $args)
        {
            $courseID = $request->getAttribute('id');
            
            $contentType = $request->getHeaderLine('Content-Type');
            if(!$contentType || $contentType != 'application/json'){
                return $response
                            ->withStatus(415);
            }

            $result = [];
            $data = $request->getParsedBody();
            
            // Section data validation
            $validation = new SectionValidator($data);
            $errors = $validation->validateForm();
            if (count($errors) > 0) {
                $result['message'] = 'Input is not valid or is incorrect';
                $result['errors'] = $errors;
                $response->getBody()->write(json_encode($result));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(400);
            }

            // Section creation
            $sectionDAO = new SectionDAO(new MySQLDatabase());

            $section = new Section();
            $section->title = $data['title'];
            $section->courseId = $courseID;
            $section->price = $data['price'];

            $result['id'] = $sectionDAO->addSection($section);
            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json')
                        ->withStatus(201);
        }

        static public function putSection(Request $request, Response $response, $args)
        {
            $contentType = $request->getHeaderLine('Content-Type');
            if(!$contentType || $contentType != 'application/json'){
                return $response
                            ->withStatus(415);
            }

            $result = [];

            $sectionID = $request->getAttribute('id');

            $sectionDAO = new SectionDAO(new MySQLDatabase());

            // Get the original data
            $original = $sectionDAO->getSection($sectionID);
            if(!$original){
                $result['message'] = 'Section does not exist';
                $response->getBody()->write(json_encode($result));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(404);
            }

            // Get new data and validate
            $data = $request->getParsedBody();
            
            $data['title'] = $data['title'] ?? $original->title;
            $data['price'] = $data['price'] ?? $original->price;
            
            // Section data validation
            $validation = new SectionValidator($data);
            $errors = $validation->validateForm();
            if (count($errors) > 0) {
                $result['message'] = 'Input is not valid or is incorrect';
                $result['errors'] = $errors;
                $response->getBody()->write(json_encode($result));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(400);
            }

            // Section edition
            $sectionData = new Section();
            $sectionData->id = $categoryID;
            $sectionData->title = $data['title'];
            $sectionData->price = $data['price'];
            $sectionData->courseId = $original->courseId;
            $sectionData->isFree = $data['free'] ?? $original->isFree;
            $sectionData->published = $data['published'] ?? $original->published;

            $sectionDAO->editSection($sectionData);

            // Prepare the return data
            $result['old'] = [
                'id' => $original->id,
                'title' => $original->title,
                'price' => $original->price,
                'free' => (bool) $original->isFree,
                'published' => (bool) $original->published
            ];

            $result['new'] = [
                'id' => $sectionData->id,
                'title' => $sectionData->title,
                'price' => $sectionData->price,
                'free' => (bool) $sectionData->isFree,
                'published' => (bool) $sectionData->published
            ];
            
            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json')
                        ->withStatus(201);
        }

        static public function deleteSection(Request $request, Response $response, $args)
        {
            $sectionID = $request->getAttribute('id');

            $sectionDAO = new CategoryDAO(new MySQLDatabase());
            $sectionDAO->deleteSection($sectionID);

            return $response;
        }

        static public function getCourseSections(Request $request, Response $response, $args)
        {
            $courseID = $request->getAttribute('id');
            $queryParams = $request->getQueryParams();

            $sectionDAO = new SectionDAO(new MySQLDatabase());

            $sections = [];

            if(isset($queryParams['userId'])){
                $sections = $sectionDAO->getUserCourseSections($courseID, $queryParams['userId']);
            }
            else{
                $sections = $sectionDAO->getCourseSections($courseID);
            }

            $result = [];
            foreach ($sections as $section) {
                $element = [];

                $element['id'] = $section->id;
                $element['title'] = $section->title;
                $element['free'] = (bool) $section->isFree;
                $element['productId'] = $section->productId;
                $element['price'] = $section->price;
                $element['published'] = (bool) $section->published;

                if(isset($queryParams['userId']){
                    $element['accessible'] = (bool) $section->accesible;
                }

                $result[] = $element;
            }

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }

        static public function getUnique(Request $request, Response $response, $args)
        {
            $sectionID = $request->getAttribute('id');

            $sectionDAO = new SectionDAO(new MySQLDatabase());
            $section = $sectionDAO->getSection($sectionID);

            if(!$section){
                return $response
                            ->withStatus(404);
            }

            $result = [];
            $result['id'] = $section->id;
            $result['title'] = $section->title;
            $result['free'] = (bool) $section->isFree;
            $result['productId'] = $section->productId;
            $result['price'] = $section->price;
            $result['published'] = (bool) $section->published;

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }
    }    
