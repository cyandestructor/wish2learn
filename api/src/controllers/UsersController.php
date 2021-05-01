<?php
    namespace Controllers;
    
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    
    use Configuration\Database\MySQLDatabase;
    use Validators\UserValidator;
    use Validators\UserEditionValidator;
    use Models\UserDAO;

    class UsersController
    {
        public function getUnique(Request $request, Response $response, $args)
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
    }
    