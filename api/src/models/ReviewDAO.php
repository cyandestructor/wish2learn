<?php
    namespace Models;

    use Configuration\Database\DatabaseInterface;

    class ReviewDAO
    {
        private $connection;
        
        public function __construct(DatabaseInterface $db)
        {
            $this->connection = $db->connect();
        }

        public function createReview(Review $review)
        {
            $reviewID = -1;

            $sql = 'CALL CreateReview(?, ?, ?, ?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $review->body,
                $review->courseID,
                $review->userID,
                $review->rate
            ]);

            $statement->bindColumn(1, $reviewID, \PDO::PARAM_INT);
            $statement->fetch(\PDO::FETCH_BOUND);

            return $reviewID;
        }

        public function editReview(Review $review)
        {
            $sql = 'CALL EditReview(?, ?, ?, ?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $review->id,
                $review->body,
                $review->rate,
                $review->published
            ]);
        }

        public function getCourseReviews($courseID, $limit, $offset = 0)
        {
            $reviews = [];

            $sql = 'CALL GetCourseReviews(?, ?, ?)';

            $statement = $this->connection->prepare($sql);
            $statement->execute([
                $courseID,
                $limit,
                $offset
            ]);

            while($row = $statement->fetch()){
                $review = new Review();

                $review->id = $row['id_review'];
                $review->body = $row['review_body'];
                $review->date = $row['review_date'];
                $review->userId = $row['user_id'];
                $review->userName = $row['username'];
                $review->rate = $row['grade'];

                $reviews[] = $review;
            }

            return $reviews;
        }

        public function getReview($reviewID)
        {
            $review = new Review();
            
            $sql = 'CALL GetReview(?)';

            $statement = $this->connection->prepare($sql);
            $statement->bindParam(1, $reviewID);
            $statement->execute();

            if($row = $statement->fetch()){
                $review->id = $row['id_review'];
                $review->body = $row['review_body'];
                $review->date = $row['review_date'];
                $review->userId = $row['user_id'];
                $review->courseId = $row['course_id'];
                $review->userName = $row['username'];
                $review->rate = $row['grade'];
                $review->published = $row['published'];
            }
            else{
                return null;
            }
        }

        public function getUserCourseReview($courseID, $userID)
        {
            $review = new Review();
            
            $sql = 'CALL GetUserCourseReview(?, ?)';

            $statement = $this->connection->prepare($sql);
            $statement->execute([
                $userID,
                $courseID
            ]);

            if($row = $statement->fetch()){
                $review->id = $row['id_review'];
                $review->body = $row['review_body'];
                $review->date = $row['review_date'];
                $review->userId = $row['user_id'];
                $review->userName = $row['username'];
                $review->rate = $row['grade'];
                $review->published = $row['published'];
            }
            else{
                return null;
            }
        }
    }
    