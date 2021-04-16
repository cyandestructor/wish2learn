<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/api/manager/HttpRequest.php');
    require_once($_SERVER['DOCUMENT_ROOT'] . '/api/manager/ResourceInterface.php');
    
    class ApiManager
    {
        private $resource;

        public function __construct(ResourceInterface $resource)
        {
            $this->resource = $resource;    
        }

        public function getResponse()
        {
            $request = new HttpRequest();

            switch ($_SERVER['REQUEST_METHOD']) {
                case 'GET':
                    return $this->resource->get($request);
                case 'POST':
                    return $this->resource->post($request);
                case 'PUT':
                    return $this->resource->put($request);
                case 'DELETE':
                    return $this->resource->delete($request);
                default:
                    return $this->resource->defaultMethod($request);
            }
        }
    }
    