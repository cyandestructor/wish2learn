<?php
    namespace Controllers;
    
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    
    use Configuration\Database\MySQLDatabase;
    use Validators\CourseValidator;
    use Validators\CourseCreationValidator;
    use Models\CourseDAO;

    class CoursesController
    {
        static public function getUnique(Request $request, Response $response, $args)
        {
            $courseID = $request->getAttribute('id');

            $courseDAO = new CourseDAO(new MySQLDatabase());
            $course = $courseDAO->getCourse($courseID);

            if(!$course){
                return $response
                            ->withStatus(404);
            }

            $result = [];
            $result['id'] = $course->id;
            $result['title'] = $course->title;
            $result['description'] = $course->description;
            $result['price'] = $course->price;
            $result['image'] = "/api/courses/$course->id/image";
            $result['instructorId'] = $course->instructorId;
            $result['instrutorName'] = $course->instructorName;
            $result['publicationDate'] = $course->publicationDate;
            $result['lastUpdate'] = $course->lastUpdate;
            $result['grade'] = $course->grade;
            $result['totalStudents'] = $course->totalStudents;
            $result['totalLessons'] = $course->totalLessons;
            $result['published'] = (bool) $course->published;

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

            $orderBy = $queryParams['orderBy'] ?? 'none';

            $courseDAO = new CourseDAO(new MySQLDatabase());

            $courses = $courseDAO->getCourses([
                'limit' => $limit,
                'offset' => $offset,
                'orderBy' => $orderBy
            ]);

            $result = [];
            foreach ($courses as $course) {
                $element = [];
                $element['id'] = $course->id;
                $element['title'] = $course->title;
                $element['description'] = $course->description;
                $element['price'] = $course->price;
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

        static public function postCourse(Request $request, Response $response, $args)
        {
            $contentType = $request->getHeaderLine('Content-Type');
            if(!$contentType || $contentType != 'application/json'){
                return $response
                            ->withStatus(415);
            }

            $result = [];
            $data = $request->getParsedBody();

            // Course data validation
            $validation = new CourseCreationValidator($data);
            $errors = $validation->validateForm();
            if (count($errors) > 0) {
                $result['message'] = 'Input is not valid or is incorrect';
                $result['errors'] = $errors;
                $response->getBody()->write(json_encode($result));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(400);
            }

            // Course creation
            $courseDAO = new CourseDAO(new MySQLDatabase());

            $courseData = new Course();
            $courseData->title = $data['title'];
            $courseData->description = $data['description'];
            $courseData->price = $data['price'];
            $courseData->instructorId = $data['instructorId'];

            $result['id'] = $courseDAO->createCourse($courseData);
            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json')
                        ->withStatus(201);
        }

        static public function putCourse(Request $request, Response $response, $args)
        {
            $contentType = $request->getHeaderLine('Content-Type');
            if(!$contentType || $contentType != 'application/json'){
                return $response
                            ->withStatus(415);
            }

            $result = [];

            $courseID = $request->getAttribute('id');
            $courseDAO = new CourseDAO(new MySQLDatabase());
            
            // Get the original data

            $original = $courseDAO->getCourse($courseID);
            if(!$original){
                $result['message'] = 'Course does not exist';
                $response->getBody()->write(json_encode($result));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(404);
            }

            // Get new data and validate
            $data = $request->getParsedBody();

            $validation = new CourseValidator($data);
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

            $courseData = new Course();
            $courseData->id = $courseID;
            $courseData->title = $data['title'];
            $courseData->description = $data['description'];
            $courseData->price = $data['price'];

            $courseDAO->createCourse($courseData);
            
            // Prepare the return data
            $result['old'] = [
                'id' => $original->id,
                'title' => $original->title,
                'description' => $original->description,
                'price' => $original->price
            ];

            $result['new'] = [
                'id' => $courseData->id,
                'title' => $courseData->title,
                'description' => $courseData->description,
                'price' => $courseData->price
            ];
            
            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json')
                        ->withStatus(201);
        }

        static public function putCourseImage(Request $request, Response $response, $args)
        {
            $result = [];
            
            $supportedMediaTypes = ['image/jpeg', 'image/png'];
            $contentType = $request->getHeaderLine('Content-Type');
            if(!$contentType || !in_array($contentType, $supportedMediaTypes)){
                return $response
                            ->withStatus(415);
            }

            $courseID = $request->getAttribute('id');

            // TODO: Check if the course exists
            $image = $request->getBody();
            if(!$image || $image->getSize() === 0){
                $result['message'] = 'The image file was not specified';
                $response->getBody()->write(json_encode($result));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(400);
            }

            $courseDAO = new CourseDAO(new MySQLDatabase());

            $courseData = new Course();
            $courseData->id = $courseID;
            $courseData->image = $image;
            $courseData->imageType = $contentType;

            $courseDAO->setCourseImage($courseData);

            return $response;
        }

        static public function getCourseImage(Request $request, Response $response, $args)
        {
            $courseID = $request->getAttribute('id');

            $courseDAO = new CourseDAO(new MySQLDatabase());
            $data = $courseDAO->getCourseImage($courseID);

            if(!$data){
                return $response->withStatus(404);
            }

            $response->getBody()->write($data->image);
            return $response
                        ->withHeader('Content-Type', $data->imageType);
        }

        static public function deleteCourse(Request $request, Response $response, $args)
        {
            $courseID = $request->getAttribute('id');

            $courseDAO = new CourseDAO(new MySQLDatabase());
            $courseDAO->deleteCourse($courseID);

            return $response;
        }
    }
    
