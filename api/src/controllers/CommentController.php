<?php
    namespace Controllers;

    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    
    use Configuration\Database\MySQLDatabase;

    use Models\Comment;
    use Models\CommentDAO;

    class CommentController
    {
        static public function postComment(Request $request, Response $response, $args)
        {
            $contentType = $request->getHeaderLine('Content-Type');
            if(!$contentType || $contentType != 'application/json'){
                return $response
                            ->withStatus(415);
            }

            $result = [];
            $data = $request->getParsedBody();

            // Comment creation
            $commentDAO = new CommentDAO(new MySQLDatabase());

            $comment = new Comment();
            $comment->userId = $data['userId'];
            $comment->lessonId = $data['lessonId'];
            $comment->body = $data['body'];
            $comment->parentId = $data['parentId'];

            $result['id'] = $commentDAO->createComment($comment);
            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json')
                        ->withStatus(201);
        }

        static public function getLessonComments(Request $request, Response $response, $args)
        {
            $lessonID = $request->getAttribute('id');
            $queryParams = $request->getQueryParams();

            $commentDAO = new CommentDAO(new MySQLDatabase());

            $comments = [];

            if(isset($queryParams['userId'])){
                $comments = $commentDAO->getLessonComments($lessonID);
            }
            else{
                $comments = $commentDAO->getUserLessonComments($lessonID, $queryParams['userId']);
            }

            $result = [];
            foreach ($comments as $comment) {
                $element = [];

                $element['id'] = $comment->id;
                $element['userId'] = $comment->userId;
                $element['userName'] = $comment->userName;
                $element['body'] = $comment->body;
                $element['upVotes'] = $comment->upVotes;
                $element['date'] = $comment->date;
                $element['parentId'] = $comment->parentId;
                $element['published'] = $comment->published;

                if(isset($queryParams['userId'])){
                    $element['upVoted'] = $comment->upVotedByUser;
                }

                $result[] = $element;
            }

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }
    }
    