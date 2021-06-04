<?php
    namespace W2l\VideoUpload;

    interface VideoUploaderInterface
    {
        public function upload(Video $video);
    }