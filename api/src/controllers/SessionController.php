<?php
    namespace W2l\Controllers;
    
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    use SlimSession\Helper as Session;
    
    use W2l\Configuration\Database\MySQLDatabase;
    use W2l\Models\UserDAO;

    class SessionController
    {
        static public function login(Request $request, Response $response, $args)
        {
            $contentType = $request->getHeaderLine('Content-Type');
            if(!$contentType || $contentType != 'application/json'){
                return $response
                            ->withStatus(415);
            }

            $data = $request->getParsedBody();

            if(!isset($data['input']) || !isset($data['password'])){
                $response->getBody()->write(json_encode([
                    'message' => 'input and password must be specified'
                ]));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(400);
            }

            $userDAO = new UserDAO(new MySQLDatabase());
            
            $input = $data['input'];
            $password = $data['password'];

            $user = $userDAO->loginUser($input, $password);

            if(!$user){
                $response->getBody()->write(json_encode([
                    'message' => 'Incorrect credentials'
                ]));
                return $response
                            ->withHeader('Content-Type', 'application/json')
                            ->withStatus(401);
            }

            $id = $user['id'];
            $user['avatar'] = "/api/users/$id/avatar";
            $session = new Session();
            $session->set('user', $user);

            $response->getBody()->write(json_encode($user));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }

        static public function getCurrent(Request $request, Response $response, $args)
        {
            $session = new Session();
            $user = $session->get('user') ?? null;

            if(!$user){
                return $response
                            ->withStatus(401);
            }

            $response->getBody()->write(json_encode($user));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }

        static public function logout(Request $request, Response $response, $args)
        {
            $session = new Session();
            $session::destroy();
            return $response;
        }
    }
    