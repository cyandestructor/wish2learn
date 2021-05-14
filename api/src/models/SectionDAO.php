<?php
    namespace W2l\Models;

    use W2l\Configuration\Database\DatabaseInterface;
    use W2l\Models\Dto\Section;

    class SectionDAO
    {
        private $connection;
        
        public function __construct(DatabaseInterface $db)
        {
            $this->connection = $db->connect();
        }

        public function addSection(Section $section)
        {
            $sectionID = -1;

            $sql = 'CALL AddSection(?, ?, ?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $section->title,
                $section->courseId,
                $section->price
            ]);

            $statement->bindColumn(1, $sectionID, \PDO::PARAM_INT);
            $statement->fetch(\PDO::FETCH_BOUND);

            return $sectionID;
        }

        public function editSection(Section $section)
        {
            $sql = 'CALL EditSection(?, ?, ?, ?, b?, b?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $section->id,
                $section->title,
                $section->courseId,
                $section->price,
                $section->isFree,
                $section->published
            ]);
        }

        public function deleteSection($sectionID)
        {
            $sql = 'CALL DeleteSection(?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $sectionID
            ]);
        }

        public function getSection($sectionID)
        {
            $section = new Section();
            
            $sql = 'CALL GetSection(?)';

            $statement = $this->connection->prepare($sql);
            $statement->bindParam(1, $sectionID);
            $statement->execute();

            if($row = $statement->fetch()){
                $section->id = $row['id_section'];
                $section->title = $row['section_title'];
                $section->isFree = $row['section_is_free'];
                $section->courseId = $row['course_id'];
                $section->productId = $row['product_id'];
                $section->price = $row['section_price'];
                $section->published = $row['published'];
                return $section;
            }
            else{
                return null;
            }
        }

        public function getCourseSections($courseID)
        {
            $sections = [];

            $sql = 'CALL GetCourseSections(?)';

            $statement = $this->connection->prepare($sql);
            $statement->execute([
                $courseID
            ]);

            while($row = $statement->fetch()){
                $section = new Section();

                $section->id = $row['id_section'];
                $section->title = $row['section_title'];
                $section->isFree = $row['section_is_free'];
                $section->productId = $row['product_id'];
                $section->price = $row['section_price'];
                $section->published = $row['published'];

                $sections[] = $section;
            }

            return $sections;
        }

        public function getUserCourseSections($courseID, $userID)
        {
            $sections = [];

            $sql = 'CALL GetUserCourseSections(?, ?)';

            $statement = $this->connection->prepare($sql);
            $statement->execute([
                $courseID,
                $userID
            ]);

            while($row = $statement->fetch()){
                $section = new Section();

                $section->id = $row['id_section'];
                $section->title = $row['section_title'];
                $section->isFree = $row['section_is_free'];
                $section->price = $row['section_price'];
                $section->productId = $row['product_id'];
                $section->published = $row['published'];
                $section->accesible = $row['user_access'];

                $sections[] = $section;
            }

            return $sections;
        }
    }
    