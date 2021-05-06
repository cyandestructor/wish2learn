<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/api/manager/HttpRequest.php');
    require_once($_SERVER['DOCUMENT_ROOT'] . '/api/manager/HttpResponse.php');

    class CorsMiddleware
    {
        static public function process(HttpRequest $request, HttpResponse $response)
        {
            $corsResponse = $response;
            $corsResponse->addHeader('Access-Control-Allow-Origin: *');
            return $corsResponse;
        }
    }
    
    