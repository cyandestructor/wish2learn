<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/config/MySQLDatabase.php');
    require_once($_SERVER['DOCUMENT_ROOT'] . '/api/manager/ResourceInterface.php');
    require_once($_SERVER['DOCUMENT_ROOT'] . '/api/manager/HttpRequest.php');
    require_once($_SERVER['DOCUMENT_ROOT'] . '/api/manager/HttpResponse.php');
    require_once($_SERVER['DOCUMENT_ROOT'] . '/models/UserDAO.php');

    class AvatarResource implements ResourceInterface
    {
        public function get(HttpRequest $request)
        {
            $response = new HttpResponse();

            $userID = $request->getParameter('userId'); // Try to get the id from the request parameters
            if(!isset($userID) || !is_numeric($userID)){
                $response->addHeader('Content-Type: application/json');
                $response->setStatusCode(400);
                $result['message'] = 'The userId was not specified in the request parameters or is incorrect';
                $response->setBody(json_encode($result));
                return $response;
            }

            // TODO: Check if the user exists
            $userDAO = new UserDAO(new MySQLDatabase());
            $avatar = $userDAO->getAvatar($userID);

            if(isset($avatar)){
                $response->addHeader('Content-Type: image/jpeg');
                $response->setStatusCode(200);
                $response->setBody($avatar);
            }
            else{
                $response->setStatusCode(404);
            }

            return $response;
        }

        public function post(HttpRequest $request)
        {
            return $this->defaultMethod($request);
        }

        public function put(HttpRequest $request)
        {
            $response = new HttpResponse();

            $userID = $request->getParameter('userId'); // Try to get the id from the request parameters
            if(!isset($userID) || !is_numeric($userID)){
                $response->addHeader('Content-Type: application/json');
                $response->setStatusCode(400);
                $result['message'] = 'The userId was not specified in the request parameters or is incorrect';
                $response->setBody(json_encode($result));
                return $response;
            }

            // TODO: Check if the user exists

            $avatar = $request->getBody();

            if(!isset($avatar)){
                $response->addHeader('Content-Type: application/json');
                $response->setStatusCode(400);
                $result['message'] = 'The avatar file was not specified';
                $response->setBody(json_encode($result));
                return $response;
            }
            
            $userDAO = new UserDAO(new MySQLDatabase());
            $userDAO->setAvatar($userID, $avatar);

            $response->setStatusCode(200);
            return $response;
        }

        public function delete(HttpRequest $request)
        {
            return $this->defaultMethod($request);
        }

        public function defaultMethod(HttpRequest $request)
        {
            $response = new HttpResponse();
            $response->setStatusCode(405); // Method Not Allowed
            return $response;
        }
    }
    