<?php
    namespace W2l\Models;

    use W2l\Configuration\Database\DatabaseInterface;
    use W2l\Models\Dto\Resource;

    class ResourceDAO
    {
        private $connection;
        
        public function __construct(DatabaseInterface $db)
        {
            $this->connection = $db->connect();
        }

        public function addResource(Resource $resource)
        {
            $resourceID = -1;

            $sql = 'CALL AddResource(?, ?, ?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $resource->content,
                $resource->contentType
                $resource->lessonId
            ]);

            $statement->bindColumn(1, $resourceID, \PDO::PARAM_INT);
            $statement->fetch(\PDO::FETCH_BOUND);

            return $resourceID;
        }

        public function deleteResource($resourceID)
        {
            $sql = 'CALL DeleteResource(?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $resourceID
            ]);
        }

        public function getResource($resourceID)
        {
            $resource = new Resource();
            
            $sql = 'CALL GetResource(?)';

            $statement = $this->connection->prepare($sql);
            $statement->bindParam(1, $resourceID);
            $statement->execute();

            if($row = $statement->fetch()){
                $resource->id = $row['id_resource'];
                $resource->content = $row['resource_content'];
                $resource->contentType = $row['content_type'];
                $resource->lessonId = $row['lesson_id'];
            }
            else{
                return null;
            }
        }

        public function getLessonResources($lessonID)
        {
            $resources = [];

            $sql = 'CALL GetLessonResources(?)';

            $statement = $this->connection->prepare($sql);
            $statement->execute([
                $lessonID
            ]);

            while($row = $statement->fetch()){
                $resource = new Resource();

                $resource->id = $row['id_resource'];
                $resource->contentType = $row['content_type'];

                $resources[] = $resource;
            }

            return $resources;
        }
    }
    