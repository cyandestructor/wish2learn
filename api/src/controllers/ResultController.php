<?php
    namespace W2l\Controllers;
    
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    
    use W2l\Configuration\Database\MySQLDatabase;
    
    use W2l\Models\Dto\Course;
    use W2l\Models\CourseDAO;

    class ResultController
    {
        static public function getList(Request $request, Response $response, $args)
        {
            $queryParams = $request->getQueryParams();

            $query = $queryParams['query'] ?? '';

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

            $courseDAO = new CourseDAO(new MySQLDatabase());

            $courses = $courseDAO->getResultCourses($query, $limit, $offset);

            $result = [];
            foreach ($courses as $course) {
                $element = [];
                $element['id'] = $course->id;
                $element['title'] = $course->title;
                $element['description'] = $course->description;
                $element['price'] = $course->price;
                $element['productId'] = $course->productId;
                $element['image'] = "/api/courses/$course->id/image";
                $element['instructorId'] = $course->instructorId;
                $element['instrutorName'] = $course->instructorName;
                $element['grade'] = $course->grade;
                $element['published'] = (bool) $course->published;
                $element['link'] = "/api/courses/$course->id";

                $result[] = $element;
            }

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }
    }
    