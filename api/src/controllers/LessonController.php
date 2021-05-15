<?php
    namespace W2l\Controllers;

    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    
    use W2l\Configuration\Database\MySQLDatabase;

    use W2l\Validators\LessonValidator;
    use W2l\Models\Dto\Lesson;
    use W2l\Models\LessonDAO;

    class LessonController
    {
        static public function postLesson(Request $request, Response $response, $args)
        {
            $sectionID = $request->getAttribute('id');

            $contentType = $request->getHeaderLine('Content-Type');
            if(!$contentType || $contentType != 'application/json'){
                return $response
                            ->withStatus(415);
            }

            $result = [];
            $data = $request->getParsedBody();

            // Lesson data validation
            $validation = new LessonValidator($data);
            $errors = $validation->validateForm();
            if (count($errors) > 0) {
                $result['message'] = 'Input is not valid or is incorrect';
                $result['errors'] = $errors;
                $response->getBody()->write(json_encode($result));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(400);
            }

            // Lesson creation
            $lessonDAO = new LessonDAO(new MySQLDatabase());

            $lesson = new Lesson();
            $lesson->title = $data['title'];
            $lesson->type = $data['type'];
            $lesson->text = $data['text'];
            $lesson->sectionId = $sectionID;

            $result['id'] = $lessonDAO->addLesson($lesson);
            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json')
                        ->withStatus(201);
        }

        static public function putLesson(Request $request, Response $response, $args)
        {
            $contentType = $request->getHeaderLine('Content-Type');
            if(!$contentType || $contentType != 'application/json'){
                return $response
                            ->withStatus(415);
            }

            $result = [];

            $lessonID = $request->getAttribute('id');

            $lessonDAO = new LessonDAO(new MySQLDatabase());

            // Get the original data
            $original = $lessonDAO->getLesson($lessonID);
            if(!$original){
                $result['message'] = 'Lesson does not exist';
                $response->getBody()->write(json_encode($result));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(404);
            }

            // Get new data and validate
            $data = $request->getParsedBody();
            
            $data['title'] = $data['title'] ?? $original->title;

            // Lesson data validation
            $validation = new LessonValidator($data);
            $errors = $validation->validateForm();
            if (count($errors) > 0) {
                $result['message'] = 'Input is not valid or is incorrect';
                $result['errors'] = $errors;
                $response->getBody()->write(json_encode($result));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(400);
            }

            // Lesson edition
            $lessonData = new Lesson();
            $lessonData->id = $lessonID;
            $lessonData->title = $data['title'];
            $lessonData->text = $data['text'] ?? $original->text;
            $lessonData->published = $data['published'] ?? $original->published;

            $lessonDAO->editLesson($lessonData);

            // Prepare the return data
            $result['old'] = [
                'id' => $original->id,
                'title' => $original->title,
                'text' => $original->text,
                'published' => (bool)$original->published
            ];

            $result['new'] = [
                'id' => $lessonData->id,
                'title' => $lessonData->title,
                'text' => $lessonData->text,
                'published' => (bool)$lessonData->published
            ];
            
            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }

        static public function deleteLesson(Request $request, Response $response, $args)
        {
            $lessonID = $request->getAttribute('id');

            $lessonDAO = new LessonDAO(new MySQLDatabase());
            $lessonDAO->deleteLesson($lessonID);

            return $response;
        }

        static public function getUnique(Request $request, Response $response, $args)
        {
            $lessonID = $request->getAttribute('id');

            $lessonDAO = new LessonDAO(new MySQLDatabase());
            $lesson = $lessonDAO->getLesson($lessonID);

            if(!$lesson){
                return $response
                            ->withStatus(404);
            }

            $result = [];
            $result['id'] = $lesson->id;
            $result['title'] = $lesson->title;
            $result['type'] = $lesson->type;
            $result['text'] = $lesson->text;
            $result['published'] = (bool) $lesson->published;
            $result['video'] = $lesson->videoAddress;
            $result['duration'] = $lesson->duration;
            $result['sectionId'] = $lesson->sectionId;

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }

        static public function getSectionLessons(Request $request, Response $response, $args)
        {
            $sectionID = $request->getAttribute('id');
            $queryParams = $request->getQueryParams();

            $lessonDAO = new LessonDAO(new MySQLDatabase());

            $lessons = [];

            if(isset($queryParams['userId'])){
                $lessons = $lessonDAO->getSectionUserLessons($sectionID, $queryParams['userId']);
            }
            else{
                $lessons = $lessonDAO->getSectionLessons($sectionID);
            }

            $result = [];
            foreach ($lessons as $lesson) {
                $element = [];

                $element['id'] = $lesson->id;
                $element['title'] = $lesson->title;
                $element['published'] = (bool) $lesson->published;
                $element['duration'] = $lesson->duration;
                $element['link'] = "/api/lessons/$lesson->id";

                if(isset($queryParams['userId'])){
                    $element['completed'] = (bool) $lesson->completed;
                }

                $result[] = $element;
            }

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }
    }
    
