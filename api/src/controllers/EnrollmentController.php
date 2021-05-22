<?php
    namespace W2l\Controllers;
    
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    
    use W2l\Configuration\Database\MySQLDatabase;
    
    use W2l\Models\UserDAO;
    use W2l\Models\Dto\Course;
    use W2l\Models\CourseDAO;

    class EnrollmentController
    {
        static public function postEnrollment(Request $request, Response $response, $args)
        {
            $contentType = $request->getHeaderLine('Content-Type');
            if(!$contentType || $contentType != 'application/json'){
                return $response
                            ->withStatus(415);
            }

            $result = [];
            $data = $request->getParsedBody();

            $userID = $data['userId'];
            $courseID = $data['courseId'];

            $userDAO = new UserDAO(new MySQLDatabase());
            $userDAO->enrollUser($userID, $courseID);

            return $response
                        ->withStatus(201);
        }

        static public function getUserEnrollments(Request $request, Response $response, $args)
        {
            $userID = $request->getAttribute('id');

            $courseDAO = new CourseDAO(new MySQLDatabase());

            $courses = $courseDAO->getUserEnrolledCourses($userID);

            $result = [];
            foreach ($courses as $course) {
                $element = [];

                $element['id'] = $course->id;
                $element['title'] = $course->title;
                $element['description'] = $course->description;
                $element['productId'] = $course->productId;
                $element['price'] = $course->price;
                $element['image'] = "/api/courses/$course->id/image";
                $element['instructorId'] = $course->instructorId;
                $element['instructorName'] = $course->instructorName;
                $element['grade'] = $course->grade;
                $element['totalLessons'] = $course->totalLessons;
                $element['published'] = (bool) $course->published;
                $element['enrollDate'] = $course->enrollDate;
                $element['completedLessons'] = $course->completedLessons;
                
                $element['completionRate'] =
                    $course->totalLessons > 0 ?
                    $course->completedLessons / $course->totalLessons : 0;
                
                $element['link'] = "/api/courses/$course->id";

                $result[] = $element;
            }

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }
    }
    