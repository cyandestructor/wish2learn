<?php
    namespace W2l\Models;

    use W2l\Configuration\Database\DatabaseInterface;
    use W2l\Models\Dto\Category;

    class CategoryDAO
    {
        private $connection;
        
        public function __construct(DatabaseInterface $db)
        {
            $this->connection = $db->connect();
        }

        public function createCategory(Category $category)
        {
            $categoryID = -1;

            $sql = 'CALL CreateCategory(?, ?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $category->name,
                $category->description
            ]);

            $statement->bindColumn(1, $categoryID, \PDO::PARAM_INT);
            $statement->fetch(\PDO::FETCH_BOUND);

            return $categoryID;
        }

        public function editCategory(Category $category)
        {
            $sql = 'CALL EditCategory(?, ?, ?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $category->id,
                $category->name,
                $category->description
            ]);
        }

        public function deleteCategory($categoryID)
        {
            $sql = 'CALL DeleteCategory(?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $categoryID
            ]);
        }

        public function getCategory($categoryID)
        {
            $category = new Category();
            
            $sql = 'CALL GetCategory(?)';

            $statement = $this->connection->prepare($sql);
            $statement->bindParam(1, $categoryID);
            $statement->execute();

            if($row = $statement->fetch()){
                $category->id = $row['id_category'];
                $category->name = $row['category_name'];
                $category->description = $row['category_description'];
            }
            else{
                return null;
            }

            return $category;
        }

        public function getCategories($limit, $offset = 0)
        {
            $categories = [];

            $sql = 'CALL GetCategories(?, ?)';

            $statement = $this->connection->prepare($sql);
            $statement->execute([
                $limit,
                $offset
            ]);

            while($row = $statement->fetch()){
                $category = new Category();

                $category->id = $row['id_category'];
                $category->name = $row['category_name'];
                $category->description = $row['category_description'];

                $categories[] = $category;
            }

            return $categories;
        }

        public function getCourseCategories($courseID)
        {
            $categories = [];

            $sql = 'CALL GetCourseCategories(?)';

            $statement = $this->connection->prepare($sql);
            $statement->execute([
                $courseID
            ]);

            while($row = $statement->fetch()){
                $category = new Category();

                $category->id = $row['id_category'];
                $category->name = $row['category_name'];
                $category->description = $row['category_description'];

                $categories[] = $category;
            }

            return $categories;
        }
    }
    