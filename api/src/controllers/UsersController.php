<?php
    namespace W2l\Controllers;
    
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    
    use W2l\Configuration\Database\MySQLDatabase;
    use W2l\Validators\UserValidator;
    use W2l\Validators\UserEditionValidator;
    use W2l\Models\UserDAO;

    class UsersController
    {
        static public function getUnique(Request $request, Response $response, $args)
        {
            $result = [];

            $userID = $request->getAttribute('id');

            $userDAO = new UserDAO(new MySQLDatabase());
            $user = $userDAO->getUser($userID);
            if(!$user){
                return $response->withStatus(404);
            }

            $result['id'] = $user['id'];
            $result['username'] = $user['username'];
            $result['name'] = $user['name'];
            $result['lastname'] = $user['lastname'];
            $result['description'] = $user['description'];
            $result['role'] = $user['role'];
            $result['creationDate'] = $user['creationDate'];
            $result['lastChangeDate'] = $user['lastChangeDate'];
            $result['accountState'] = $user['accountState'];
            $result['avatar'] = "/api/users/$userID/avatar";

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }

        static public function postUser(Request $request, Response $response, $args)
        {
            $contentType = $request->getHeaderLine('Content-Type');
            if(!$contentType || $contentType != 'application/json'){
                return $response->withStatus(415);
            }

            $result = [];
            $data = $request->getParsedBody();

            // User data validation
            $validation = new UserValidator($data);
            $errors = $validation->validateForm();
            if (count($errors) > 0) {
                $result['message'] = 'Input is not valid or is incorrect';
                $result['errors'] = $errors;
                $response->getBody()->write(json_encode($result));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(400);
            }

            // User registration
            $user = new UserDAO(new MySQLDatabase());
            $id = $user->register($data);
            if($id === -1){
                $result['message'] = 'Resource could not be created';
                $response->getBody()->write(json_encode($result));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(500);
            }

            $result['id'] = $id;
            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json')
                        ->withStatus(201);
        }

        static public function putUser(Request $request, Response $response, $args)
        {
            $contentType = $request->getHeaderLine('Content-Type');
            if(!$contentType || $contentType != 'application/json'){
                return $response->withStatus(415);
            }

            $result = [];

            $userID = $request->getAttribute('id');

            $userDAO = new UserDAO(new MySQLDatabase());
            // Get the original user info
            $user = $userDAO->getUser($userID);

            if(!$user){
                $result['message'] = 'User does not exists';
                $response->getBody()->write(json_encode($result));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(404);
            }

            // Get the data to edit and validate
            $data = $request->getParsedBody();

            $validation = new UserEditionValidator($data);
            $errors = $validation->validateForm();
            if (count($errors) > 0) {
                $result['message'] = 'Input is not valid or is incorrect';
                $result['errors'] = $errors;
                $response->getBody()->write(json_encode($result));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(400);
            }

            // Join the data to be sent to the database
            $editedUser = [
                'id' => $userID,
                'username' => array_key_exists('username', $data) ? $data['username'] : $user['username'],
                'name' => array_key_exists('name', $data) ? $data['name'] : $user['name'],
                'lastname' => array_key_exists('lastname', $data) ? $data['lastname'] : $user['lastname'],
                'email' => array_key_exists('email', $data) ? $data['email'] : $user['email'],
                'description' => array_key_exists('description', $data) ? $data['description'] : $user['description'],
                'role' => $data['role'] ?? $user['role']
            ];
            if(array_key_exists('password', $data)){
                $editedUser['password'] = $data['password'];
            }

            $userDAO->editUser($editedUser);

            // Return the old and new data
            $result['old'] = [
                'id' => $user['id'],
                'username' => $user['username'],
                'name' => $user['name'],
                'lastname' => $user['lastname'],
                'email' => $user['email'],
                'description' => $user['description'],
                'role' => $user['role']
            ];

            $result['new'] = [
                'id' => $editedUser['id'],
                'username' => $editedUser['username'],
                'name' => $editedUser['name'],
                'lastname' => $editedUser['lastname'],
                'email' => $editedUser['email'],
                'description' => $editedUser['description'],
                'role' => $editedUser['role']
            ];

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }

        static public function putUserAvatar(Request $request, Response $response, $args)
        {
            $result = [];
            
            $supportedMediaTypes = ['image/jpeg', 'image/png'];
            $contentType = $request->getHeaderLine('Content-Type');
            if(!$contentType || !in_array($contentType, $supportedMediaTypes)){
                return $response
                            ->withStatus(415);
            }

            $userID = $request->getAttribute('id');

            // TODO: Check if the user exists
            $avatar = $request->getBody();
            if(!$avatar || $avatar->getSize() === 0){
                $result['message'] = 'The avatar file was not specified';
                $response->getBody()->write(json_encode($result));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(400);
            }

            $userDAO = new UserDAO(new MySQLDatabase());
            $userDAO->setAvatar($userID, $avatar, $contentType);

            return $response;
        }

        static public function getUserAvatar(Request $request, Response $response, $args)
        {
            $userID = $request->getAttribute('id');

            // TODO: Check if the user exits
            $userDAO = new UserDAO(new MySQLDatabase());
            $avatar = $userDAO->getAvatar($userID);

            if(!$avatar || !$avatar['data']){
                return $response->withStatus(404);
            }

            $response->getBody()->write($avatar['data']);
            return $response
                        ->withHeader('Content-Type', $avatar['contentType']);
        }

        static public function deleteUser(Request $request, Response $response, $args)
        {
            $userID = $request->getAttribute('id');

            $userDAO = new UserDAO(new MySQLDatabase());
            $userDAO->deleteUser($userID);

            return $response;
        }

        static public function checkUserExists(Request $request, Response $response, $args)
        {
            $queryParams = $request->getQueryParams();

            $username = $queryParams['username'] ?? '';
            $email = $queryParams['email'] ?? '';

            $userDAO = new UserDAO(new MySQLDatabase());

            $count = $userDAO->checkUser($username, $email);

            if($count <= 0){
                return $response
                            ->withStatus(404);
            }

            return $response;
        }

        static public function getCourseEnrolledUsers(Request $request, Response $response, $args)
        {
            $courseID = $request->getAttribute('id');
            
            $userDAO = new UserDAO(new MySQLDatabase());

            $users = $userDAO->getCourseEnrolledUsers($courseID);

            $result = [];
            foreach ($users as $user) {
                $element = [];
                
                $userID = $user['id'];
                $element['id'] = $userID;
                $element['username'] = $user['username'];
                $element['name'] = $user['name'];
                $element['lastname'] = $user['lastname'];
                $element['avatar'] = "/api/users/$userID/avatar";
                $element['enrollDate'] = $user['enrollDate'];
                $element['completionRate'] =
                    $user['courseTotalLessons'] > 0 ?
                    $user['lessonsCompleted'] / $user['courseTotalLessons'] : 0;
                $element['link'] = "/api/users/$userID";

                $result[] = $element;
            }

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }
    }
    