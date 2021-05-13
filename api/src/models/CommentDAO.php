<?php
    namespace W2l\Models;

    use W2l\Configuration\Database\DatabaseInterface;
    use W2l\Models\Dto\Comment;

    class CommentDAO
    {
        private $connection;
        
        public function __construct(DatabaseInterface $db)
        {
            $this->connection = $db->connect();
        }

        public function createComment(Comment $comment)
        {
            $commentID = -1;

            $sql = 'CALL CreateComment(?, ?, ?, ?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $comment->userId,
                $comment->lessonId,
                $comment->body,
                $comment->parentId
            ]);

            $statement->bindColumn(1, $commentID, \PDO::PARAM_INT);
            $statement->fetch(\PDO::FETCH_BOUND);

            return $commentID;
        }

        public function hideComment(Comment $comment)
        {
            $sql = 'CALL HideComment(?, ?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $comment->id,
                $comment->published
            ]);
        }

        public function voteComment($commentID, $commenterID, $vote)
        {
            $sql = 'CALL VoteComment(?, ?, ?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $commentID,
                $commenterID,
                $vote
            ]);
        }

        public function getLessonComments($lessonID)
        {
            $comments = [];

            $sql = 'CALL GetLessonComments(?)';

            $statement = $this->connection->prepare($sql);
            $statement->execute([
                $lessonID
            ]);

            while($row = $statement->fetch()){
                $comment = new Comment();

                $comment->id = $row['id_comment'];
                $comment->userId = $row['user_id'];
                $comment->userName = $row['username'];
                $comment->body = $row['comment_body'];
                $comment->upVotes = $row['comment_upvotes'];
                $comment->date = $row['comment_date'];
                $comment->parentId = $row['comment_parent_id'];
                $comment->published = $row['published'];

                $comments[] = $comment;
            }

            return $comments;
        }

        public function getUserLessonComments($lessonID, $userID)
        {
            $comments = [];

            $sql = 'CALL GetUserLessonComments(?, ?)';

            $statement = $this->connection->prepare($sql);
            $statement->execute([
                $userID,
                $lessonID
            ]);

            while($row = $statement->fetch()){
                $comment = new Comment();

                $comment->id = $row['id_comment'];
                $comment->userId = $row['user_id'];
                $comment->userName = $row['username'];
                $comment->body = $row['comment_body'];
                $comment->upVotes = $row['comment_upvotes'];
                $comment->date = $row['comment_date'];
                $comment->parentId = $row['comment_parent_id'];
                $comment->published = $row['published'];
                $comment->upVotedByUser = $row['comment_upvoted'];

                $comments[] = $comment;
            }

            return $comments;
        }
    }
    