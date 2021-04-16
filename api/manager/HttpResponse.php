<?php
    class HttpResponse
    {
        private $headers = [];
        private $statusCode;
        private $body;

        public function send()
        {
            foreach($this->headers as $header){
                header($header);
            }

            if(isset($this->statusCode)){
                http_response_code($this->statusCode);
            }

            return $this->getBody();
        }

        public function addHeader($header)
        {
            $this->headers[] = $header;
        }

        public function addHeaders(Array $headers)
        {
            foreach ($headers as $$header) {
                $this->headers[] = $header;
            }
        }

        public function getHeaders()
        {
            return $this->headers;
        }

        public function setStatusCode($statusCode)
        {
            $this->statusCode = $statusCode;
        }

        public function getStatusCode()
        {
            return $this->statusCode;
        }

        public function setBody($body)
        {
            $this->body = $body;
        }

        public function getBody()
        {
            return $this->body;
        }
    }
    