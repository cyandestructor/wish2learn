<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/config/MySQLDatabase.php');
    require_once($_SERVER['DOCUMENT_ROOT'] . '/api/manager/ResourceInterface.php');
    require_once($_SERVER['DOCUMENT_ROOT'] . '/api/manager/HttpRequest.php');
    require_once($_SERVER['DOCUMENT_ROOT'] . '/api/manager/HttpResponse.php');
    require_once($_SERVER['DOCUMENT_ROOT'] . '/api/validators/user/UserValidator.php');
    require_once($_SERVER['DOCUMENT_ROOT'] . '/models/UserDAO.php');

    class UsersResource implements ResourceInterface
    {
        public function get(HttpRequest $request)
        {
            $response = new HttpResponse();
            
            $result = [];

            $userID = $request->getParameter('userId'); // Try to get the id from the request parameters
            if(!isset($userID)){
                $response->addHeader('Content-Type: application/json');
                $response->setStatusCode(400);
                $result['message'] = 'The userId was not specified in the request parameters or is incorrect';
                $response->setBody(json_encode($result));
                return $response;
            }

            $userDAO = new UserDAO(new MySQLDatabase());
            $user = $userDAO->getUser($userID);
            if(isset($user)){
                $response->addHeader('Content-Type: application/json');
                $response->setStatusCode(200);

                $result['id'] = $user['id'];
                $result['username'] = $user['username'];
                $result['name'] = $user['name'];
                $result['lastname'] = $user['lastname'];
                $result['description'] = $user['description'];
                $result['role'] = $user['role'];
                $result['creationDate'] = $user['creationDate'];
                $result['lastChangeDate'] = $user['lastChangeDate'];
                $result['accountState'] = $user['accountState'];
                $result['avatar'] = "/users/$userID/avatar";

                $response->setBody(json_encode($result));
            }
            else{
                $response->setStatusCode(404);                
            }

            return $response;
        }

        public function post(HttpRequest $request)
        {
            $response = new HttpResponse();

            $contentType = $request->getContentType();
            if(!isset($contentType) || $contentType != 'application/json'){
                $response->setStatusCode(415);
                return $response;
            }

            $response->addHeader('Content-Type: application/json');

            $result = [];
            $data = json_decode($request->getBody(), true);
            
            // User data validation
            $validation = new UserValidator($data);
            $errors = $validation->validateForm();
            if (count($errors) > 0) {
                $response->setStatusCode(400);
                $result['message'] = 'Input is not valid or is incorrect';
                $result['errors'] = $errors;
                $response->setBody(json_encode($result));
                return $response;
            }

            // User registration
            $user = new UserDAO(new MySQLDatabase());
            $id = $user->register($data);
            if($id != -1){
                $response->setStatusCode(201);
                $result['id'] = $id;
            }
            else{
                $response->setStatusCode(500);
                $result['message'] = 'Resource could not be created';
            }
            
            $response->setBody(json_encode($result));
            return $response;
        }
        
        public function put(HttpRequest $request)
        {
            $response = new HttpResponse();
            
            $contentType = $request->getContentType();
            if(!isset($contentType) || $contentType != 'application/json'){
                $response->setStatusCode(415);
                return $response;
            }
        }
        
        public function delete(HttpRequest $request)
        {

        }

        public function defaultMethod(HttpRequest $request)
        {
            $response = new HttpResponse();
            $response->setStatusCode(405); // Method Not Allowed
            return $response;
        }
    }

    