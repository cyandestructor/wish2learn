<?php
    namespace W2l\Controllers;

    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    
    use W2l\Configuration\Database\MySQLDatabase;

    use W2l\Models\Dto\Chat;
    use W2l\Models\ChatDAO;

    class ChatController
    {
        static public function postChat(Request $request, Response $response, $args)
        {
            $contentType = $request->getHeaderLine('Content-Type');
            if(!$contentType || $contentType != 'application/json'){
                return $response
                            ->withStatus(415);
            }

            $result = [];
            $data = $request->getParsedBody();

            // Chat creation
            $chatDAO = new ChatDAO(new MySQLDatabase());

            $chat = new Chat();
            $chat->senderId = $data['senderId'];
            $chat->receptorId = $data['receptorId'];
            $chat->name = $data['name'];

            $result['id'] = $chatDAO->createChat($chat);
            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json')
                        ->withStatus(201);
        }

        static public function getUserChats(Request $request, Response $response, $args)
        {
            $userID = $request->getAttribute('id');

            $chatDAO = new ChatDAO(new MySQLDatabase());

            $chats = $chatDAO->getUserChats($userID);

            $result = [];
            foreach ($chats as $chat) {
                $element = [];

                $element['id'] = $chat->id;
                $element['name'] = $chat->name;
                $element['link'] = "/api/chats/$chat->id";

                $result[] = $element;
            }

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }
    }
    