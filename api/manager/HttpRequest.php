<?php
    class HttpRequest
    {
        private $headers;
        private $contentType;
        private $body;
        private $parameters;
        private $method;

        public function __construct()
        {
            $this->headers = $this->getRequestHeaders();
            $this->contentType = (isset($_SERVER['CONTENT_TYPE'])) ? $_SERVER['CONTENT_TYPE'] : null;
            $this->body = file_get_contents('php://input');
            $this->parameters = $_GET;
            $this->method = $_SERVER['REQUEST_METHOD'];
        }

        public function getHeaders()
        {
            return $this->headers;
        }

        public function getContentType()
        {
            return $this->contentType;
        }

        public function getBody()
        {
            return $this->body;
        }

        public function getParameter($name)
        {
            return isset($this->parameters[$name]) ? $this->parameters[$name] : null;
        }

        public function getMethod()
        {
            return $this->method;
        }

        private function getRequestHeaders()
        {
            // Based on: https://stackoverflow.com/a/541463

            $headers = [];
            
            foreach($_SERVER as $key => $value) {
                if (substr($key, 0, 5) != 'HTTP_') {
                    continue;
                }
                $header = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))));
                $headers[$header] = $value;
            }
            
            return $headers;
        }
    }
    