<?php
    namespace W2l\Models;

    use W2l\Configuration\Database\DatabaseInterface;
    use W2l\Models\Dto\Lesson;

    class LessonDAO
    {
        private $connection;

        public function __construct(DatabaseInterface $db)
        {
            $this->connection = $db->connect();
        }

        public function addLesson(Lesson $lesson)
        {
            $lessonID = -1;

            $sql = 'CALL AddLesson(?, ?, ?, ?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $lesson->title,
                $lesson->type,
                $lesson->text,
                $lesson->sectionId
            ]);

            $statement->bindColumn(1, $lessonID, \PDO::PARAM_INT);
            $statement->fetch(\PDO::FETCH_BOUND);

            return $lessonID;
        }

        public function editLesson(Lesson $lesson)
        {
            $sql = 'CALL EditLesson(?, ?, ?, b?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $lesson->id,
                $lesson->title,
                $lesson->text,
                $lesson->published
            ]);
        }

        public function deleteLesson($lessonID)
        {
            $sql = 'CALL DeleteLesson(?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $lessonID
            ]);
        }

        public function setUserLessonCompleted($lessonID, $userID, $completed)
        {
            $sql = 'CALL SetLessonCompleted(?, ?, ?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $lessonID,
                $userID,
                $completed
            ]);
        }

        public function getSectionLessons($sectionID)
        {
            $lessons = [];

            $sql = 'CALL GetSectionLessons(?)';

            $statement = $this->connection->prepare($sql);
            $statement->execute([
                $sectionID
            ]);

            while($row = $statement->fetch()){
                $lesson = new Lesson();

                $lesson->id = $row['id_lesson'];
                $lesson->title = $row['lesson_title'];
                $lesson->published = $row['published'];
                $lesson->duration = $row['lesson_duration'];
                $lesson->sectionId = $row['section_id'];

                $lessons[] = $lesson;
            }

            return $lessons;
        }

        public function getSectionUserLessons($sectionID, $userID)
        {
            $lessons = [];

            $sql = 'CALL GetSectionUserLessons(?, ?)';

            $statement = $this->connection->prepare($sql);
            $statement->execute([
                $userID,
                $sectionID
            ]);

            while($row = $statement->fetch()){
                $lesson = new Lesson();

                $lesson->id = $row['id_lesson'];
                $lesson->title = $row['lesson_title'];
                $lesson->published = $row['published'];
                $lesson->duration = $row['lesson_duration'];
                $lesson->sectionId = $row['section_id'];
                $lesson->completed = $row['lesson_completed'];

                $lessons[] = $lesson;
            }

            return $lessons;
        }

        public function getLesson($lessonID)
        {
            $lesson = new Lesson();
            
            $sql = 'CALL GetLessonInfo(?)';

            $statement = $this->connection->prepare($sql);
            $statement->bindParam(1, $lessonID);
            $statement->execute();

            if($row = $statement->fetch()){
                $lesson->id = $row['id_lesson'];
                $lesson->title = $row['lesson_title'];
                $lesson->type = $row['content_type'];
                $lesson->text = $row['lesson_text'];
                $lesson->published = $row['published'];
                $lesson->videoAddress = $row['video_address'];
                $lesson->duration = $row['lesson_duration'];
                $lesson->sectionId = $row['section_id'];
                return $lesson;
            }
            else{
                return null;
            }
        }

        public function setLessonCompleted($userID, $lessonID, $completed)
        {
            $sql = 'CALL SetLessonCompleted(?, ?, b?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $userID,
                $lessonID,
                $completed
            ]);
        }
    }
    