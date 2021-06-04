<?php
    namespace W2l\Controllers;

    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    
    use W2l\Configuration\Database\MySQLDatabase;

    use W2l\Models\Dto\Review;
    use W2l\Models\ReviewDAO;

    class ReviewController
    {
        static public function postReview(Request $request, Response $response, $args)
        {
            $contentType = $request->getHeaderLine('Content-Type');
            if(!$contentType || $contentType != 'application/json'){
                return $response
                            ->withStatus(415);
            }

            $result = [];
            $data = $request->getParsedBody();

            $courseID = $request->getAttribute('id');

            // Review creation
            $reviewDAO = new ReviewDAO(new MySQLDatabase());

            $review = new Review();
            $review->body = $data['body'];
            $review->courseID = $courseID;
            $review->userID = $data['userId'];
            $review->rate = $data['rate'];

            $result['id'] = $reviewDAO->createReview($review);
            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json')
                        ->withStatus(201);
        }

        static public function putReview(Request $request, Response $response, $args)
        {
            $contentType = $request->getHeaderLine('Content-Type');
            if(!$contentType || $contentType != 'application/json'){
                return $response
                            ->withStatus(415);
            }

            $result = [];

            $reviewID = $request->getAttribute('id');

            $reviewDAO = new ReviewDAO(new MySQLDatabase());

            // Get the original data
            $original = $reviewDAO->getReview($reviewID);
            if(!$original){
                $result['message'] = 'Review does not exist';
                $response->getBody()->write(json_encode($result));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(404);
            }

            // Get new data
            $data = $request->getParsedBody();

            // Review edition
            $reviewData = new Review();
            $reviewData->id = $reviewID;
            $reviewData->body = $data['body'] ?? $original->body;
            $reviewData->rate = $data['rate'] ?? $original->rate;
            $reviewData->published = $data['published'] ?? $original->published;

            $reviewDAO->editReview($reviewData);

            // Prepare the return data
            $result['old'] = [
                'id' => $original->id,
                'body' => $original->body,
                'rate' => $original->rate,
                'published' => (bool)$original->published
            ];

            $result['new'] = [
                'id' => $reviewData->id,
                'body' => $reviewData->body,
                'rate' => $reviewData->rate,
                'published' => (bool)$reviewData->published
            ];
            
            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }

        static public function getCourseReviews(Request $request, Response $response, $args)
        {
            $courseID = $request->getAttribute('id');

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

            $reviewDAO = new ReviewDAO(new MySQLDatabase());

            $reviews = $reviewDAO->getCourseReviews($courseID, $limit, $offset);

            $result = [];
            foreach ($reviews as $review) {
                $element = [];

                $element['id'] = $review->id;
                $element['body'] = $review->body;
                $element['date'] = $review->date;
                $element['userId'] = $review->userId;
                $element['userName'] = $review->userName;
                $element['rate'] = $review->rate;
                $element['link'] = "/api/reviews/$review->id";

                $result[] = $element;
            }

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }

        static public function getUnique(Request $request, Response $response, $args)
        {
            $reviewID = $request->getAttribute('id');

            $reviewDAO = new ReviewDAO(new MySQLDatabase());
            $review = $reviewDAO->getReview($reviewID);

            if(!$review){
                return $response
                            ->withStatus(404);
            }

            $result = [];
            $result['id'] = $review->id;
            $result['body'] = $review->body;
            $result['date'] = $review->date;
            $result['userId'] = $review->userId;
            $result['userName'] = $review->userName;
            $result['courseId'] = $review->courseId;
            $result['rate'] = $review->rate;
            $result['published'] = (bool)$review->published;

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }
    }
    