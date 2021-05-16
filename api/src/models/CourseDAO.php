<?php
    namespace W2l\Models;

    use W2l\Configuration\Database\DatabaseInterface;
    use W2l\Models\Dto\Course;

    class CourseDAO
    {
        private $connection;

        public function __construct(DatabaseInterface $db)
        {
            $this->connection = $db->connect();
        }

        public function createCourse(Course $course)
        {
            $courseID = -1;

            $sql = 'CALL CreateCourse(?, ?, ?, ?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $course->title,
                $course->description,
                $course->price,
                $course->instructorId
            ]);

            $statement->bindColumn(1, $courseID, \PDO::PARAM_INT);
            $statement->fetch(\PDO::FETCH_BOUND);

            return $courseID;
        }

        public function getCourse($courseID)
        {
            $course = new Course();
            
            $sql = 'CALL GetCourseInfo(?)';

            $statement = $this->connection->prepare($sql);
            $statement->bindParam(1, $courseID);
            $statement->execute();

            if($row = $statement->fetch()){
                $course->id = $row['id_course'];
                $course->title = $row['course_title'];
                $course->description = $row['course_description'];
                $course->price = $row['course_price'];
                $course->instructorId = $row['instructor_id'];
                $course->instructorName = $row['instructor_name'];
                $course->publicationDate = $row['publication_date'];
                $course->lastUpdate = $row['last_update'];
                $course->grade = $row['course_grade'];
                $course->totalStudents = $row['total_students'];
                $course->totalLessons = $row['total_lessons'];
                $course->published = $row['published'];
            }
            else{
                return null;
            }

            return $course;
        }

        public function getCourses($configuration)
        {
            if(!isset($configuration['limit']) || !is_numeric($configuration['limit'])){
                return null;
            }

            $limit = $configuration['limit'];
            $offset = 0;
            if(isset($configuration['offset']) && is_numeric($configuration['offset'])){
                $offset = $configuration['offset'];
            }

            $orderBy = $configuration['orderBy'] ?? null;

            if(!$orderBy){
                return $this->getCoursesByPublication($limit, $offset);
            }

            switch (strtolower($orderBy)) {
                case 'rate':
                    return $this->getCoursesByRate($limit, $offset);
                case 'sales':
                    return $this->getCoursesBySells($limit, $offset);
                case 'publication':
                    return $this->getCoursesByPublication($limit, $offset);
                default:
                    return null;
            }
        }

        public function getCoursesByRate($limit, $offset = 0)
        {            
            $courses = [];

            $sql = 'CALL GetTopRatedCourses(?, ?)';

            $statement = $this->connection->prepare($sql);
            $statement->execute([
                $limit,
                $offset
            ]);

            while($row = $statement->fetch()){
                $course = new Course();

                $course->id = $row['id_course'];
                $course->title = $row['course_title'];
                $course->description = $row['course_description'];
                $course->price = $row['course_price'];
                $course->instructorId = $row['instructor_id'];
                $course->instructorName = $row['instructor_name'];
                $course->grade = $row['course_grade'];
                $course->published = $row['published'];

                $courses[] = $course;
            }

            return $courses;
        }

        public function getCoursesBySells($limit, $offset = 0)
        {
            $courses = [];

            $sql = 'CALL GetTopSellsCourses(?, ?)';

            $statement = $this->connection->prepare($sql);
            $statement->execute([
                $limit,
                $offset
            ]);

            while($row = $statement->fetch()){
                $course = new Course();

                $course->id = $row['id_course'];
                $course->title = $row['course_title'];
                $course->description = $row['course_description'];
                $course->price = $row['course_price'];
                $course->instructorId = $row['instructor_id'];
                $course->instructorName = $row['instructor_name'];
                $course->grade = $row['course_grade'];
                $course->published = $row['published'];

                $courses[] = $course;
            }

            return $courses;
        }

        public function getCoursesByPublication($limit, $offset = 0)
        {
            $courses = [];

            $sql = 'CALL GetMostRecentCourses(?, ?)';

            $statement = $this->connection->prepare($sql);
            $statement->execute([
                $limit,
                $offset
            ]);

            while($row = $statement->fetch()){
                $course = new Course();

                $course->id = $row['id_course'];
                $course->title = $row['course_title'];
                $course->description = $row['course_description'];
                $course->price = $row['course_price'];
                $course->instructorId = $row['instructor_id'];
                $course->instructorName = $row['instructor_name'];
                $course->grade = $row['course_grade'];
                $course->published = $row['published'];

                $courses[] = $course;
            }

            return $courses;
        }

        public function editCourse(Course $course)
        {
            $sql = 'CALL EditCourse(?, ?, ?, ?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $course->id,
                $course->title,
                $course->description,
                $course->price
            ]);
        }

        public function setCourseImage(Course $course)
        {
            $sql = 'CALL SetCourseImage(?, ?, ?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $course->id,
                $course->image,
                $course->imageType
            ]);
        }

        public function getCourseImage($courseID)
        {
            $sql = 'CALL GetCourseImage(?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $courseID
            ]);

            if($row = $statement->fetch()){
                $course = new Course();
                $course->id = $courseID;
                $course->image = $row['course_image'];
                $course->imageType = $row['image_content_type'];
                return $course;
            }
            else{
                return null;
            }
        }

        public function deleteCourse($courseID)
        {
            $sql = 'CALL DeleteCourse(?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $courseID
            ]);
        }

        public function addCategory($courseID, $categoryID)
        {
            $sql = 'CALL AddCategory(?, ?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $courseID,
                $categoryID
            ]);
        }

        public function deleteCategory($courseID, $categoryID)
        {
            $sql = 'CALL DeleteCategory(?, ?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $courseID,
                $categoryID
            ]);
        }

        public function getUserEnrolledCourses($userID)
        {
            $courses = [];

            $sql = 'CALL GetUserEnrolledCourses(?)';

            $statement = $this->connection->prepare($sql);
            $statement->execute([
                $userID
            ]);

            while($row = $statement->fetch()){
                $course = new Course();

                $course->id = $row['id_course'];
                $course->title = $row['course_title'];
                $course->description = $row['course_description'];
                $course->price = $row['course_price'];
                $course->instructorId = $row['instructor_id'];
                $course->instructorName = $row['instructor_name'];
                $course->grade = $row['course_grade'];
                $course->published = $row['published'];

                $course->enrollDate = $row['enroll_date'];
                $course->completedLessons = $row['completed_lessons'];

                $courses[] = $course;
            }

            return $courses;
        }
    }
    