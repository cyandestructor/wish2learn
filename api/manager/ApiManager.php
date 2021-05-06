<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/api/manager/HttpRequest.php');
    require_once($_SERVER['DOCUMENT_ROOT'] . '/api/manager/ResourceInterface.php');
    require_once($_SERVER['DOCUMENT_ROOT'] . '/api/manager/CorsMiddleware.php');

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
            $response;

            switch ($_SERVER['REQUEST_METHOD']) {
                case 'GET':
                    $response = $this->resource->get($request);
                    break;
                case 'POST':
                    $response = $this->resource->post($request);
                    break;
                case 'PUT':
                    $response = $this->resource->put($request);
                    break;
                case 'DELETE':
                    $response = $this->resource->delete($request);
                    break;
                default:
                    $response = $this->resource->defaultMethod($request);
                    break;
            }

            return CorsMiddleware::process($request, $response);
            //return $response;
        }
    }
    