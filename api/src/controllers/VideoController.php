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

        public function putLessonVideo(Request $request, Response $response, $args)
        {
            $lessonID = $request->getAttribute('id');
            
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
            
            $videoName = "lesson-$lessonID-video";
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

            $videoAddress = $uploadResult['url'];

            $videoDAO = new VideoDAO(new MySQLDatabase());
            
            $video = new \W2l\Models\Dto\Video;
            $video->lessonId = $lessonID;
            $video->duration = 0; // TODO: Get the video duration
            $video->address = $videoAddress;

            $result['id'] = $videoDAO->addVideo($video);

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }

        public function getLessonVideo(Request $request, Response $response, $args)
        {
            $lessonID = $request->getAttribute('id');

            $videoDAO = new VideoDAO(new MySQLDatabase());

            $video = $videoDAO->getLessonVideo($lessonID);

            if(!$video){
                return $response
                            ->withStatus(404);
            }

            $result = [];

            $result['id'] = $video->id;
            $result['address'] = $video->address;
            $result['duration'] = $video->duration;

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }

        static public function deleteVideo(Request $request, Response $response, $args)
        {
            $videoID = $request->getAttribute('id');

            $videoDAO = new VideoDAO(new MySQLDatabase());
            $videoDAO->deleteVideo($videoID);

            return $response;
        }
    }
    