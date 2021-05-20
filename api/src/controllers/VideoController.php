<?php
    namespace W2l\Controllers;

    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    
    use W2l\Configuration\Database\MySQLDatabase;

    use W2l\Models\VideoDAO;

    use W2l\VideoUpload\VideoUploaderInterface;

    class VideoController
    {
        private $videoUploader;

        public function __construct(VideoUploaderInterface $videoUploader)
        {
            $this->videoUploader = $videoUploader;
        }

        public function putVideo(Request $request, Response $response, $args)
        {
            $contentType = $request->getHeaderLine('Content-Type');

            $result = [];

            $videoContent = $request->getBody();
            if(!$videoContent || $videoContent->getSize() === 0){
                $result['message'] = 'The video file was not specified';
                $response->getBody()->write(json_encode($result));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(400);
            }

            $videoUpload = new \W2l\VideoUpload\Video;
            
            $videoName = "w2lvideo" . time();
            $videoUpload->setName($videoName);
            $videoUpload->setData($videoContent->getContents());
            $videoUpload->setMimeType($contentType);
            $videoUpload->setSize($videoContent->getSize());
            
            $uploadResult = $this->videoUploader->upload($videoUpload);

            if(!$uploadResult){
                return $response
                            ->withStatus(415);
            }

            if($uploadResult['status'] == 'error'){
                $result['code'] = $uploadResult['code'];
                $result['message'] = $uploadResult['message'];
                $response->getBody()->write(json_encode($result));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(500);
            }

            $result['url'] = $uploadResult['url'];
            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json')
                        ->withStatus(201);
        }
    }
    