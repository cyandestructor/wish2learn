<?php
    namespace W2l\Controllers;

    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    
    use W2l\Configuration\Database\MySQLDatabase;

    use W2l\Models\Dto\Resource;
    use W2l\Models\ResourceDAO;

    class ResourceController
    {
        static public function postResource(Request $request, Response $response, $args)
        {
            $result = [];

            $contentType = $request->getHeaderLine('Content-Type');

            $lessonID = $request->getAttribute('id');

            $content = $request->getBody();
            if(!$content || $content->getSize() === 0){
                $result['message'] = 'The resource file was not specified';
                $response->getBody()->write(json_encode($result));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(400);
            }

            $resourceDAO = new ResourceDAO(new MySQLDatabase());

            $resource = new Resource();
            $resource->content = $content;
            $resource->contentType = $contentType;
            $resource->lessonId = $lessonID;

            $result['id'] = $resourceDAO->addResource($resource);

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json')
                        ->withStatus(201);
        }

        static public function deleteResource(Request $request, Response $response, $args)
        {
            $resourceID = $request->getAttribute('id');

            $resourceDAO = new ResourceDAO(new MySQLDatabase());
            $resourceDAO->deleteResource($resourceID);

            return $response;
        }

        static public function getUnique(Request $request, Response $response, $args)
        {
            $resourceID = $request->getAttribute('id');

            $resourceDAO = new ResourceDAO(new MySQLDatabase());
            $resource = $resourceDAO->getResource($resourceID);

            if(!$resource){
                return $response
                            ->withStatus(404);
            }

            $response->getBody()->write($resource->content);
            return $response
                        ->withHeader('Content-Type', $resource->contentType);
        }

        static public function getLessonResources(Request $request, Response $response, $args)
        {
            $lessonID = $request->getAttribute('id');

            $resourceDAO = new ResourceDAO(new MySQLDatabase());

            $resources = $resourceDAO->getLessonResources($lessonID);

            $result = [];
            foreach ($resources as $resource) {
                $element = [];

                $element['id'] = $resource->id;
                $element['contentType'] = $resource->contentType;
                $element['link'] = "/api/resources/$resource->id";

                $result[] = $element;
            }

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }
    }
    