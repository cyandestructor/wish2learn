<?php
    namespace Controllers;

    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    
    use Configuration\Database\MySQLDatabase;

    use Models\Message;
    use Models\MessageDAO;

    class MessageController
    {
        static public function postMessage(Request $request, Response $response, $args)
        {
            $contentType = $request->getHeaderLine('Content-Type');
            if(!$contentType || $contentType != 'application/json'){
                return $response
                            ->withStatus(415);
            }

            $result = [];
            $data = $request->getParsedBody();

            // Message creation
            $messageDAO = new MessageDAO(new MySQLDatabase());

            $message = new Message();
            $message->senderId = $data['senderId'];
            $message->chatId = $data['chatId'];
            $message->body = $data['body'];

            $result['id'] = $messageDAO->createMessage($message);
            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json')
                        ->withStatus(201);
        }

        static public function getChatMessages(Request $request, Response $response, $args)
        {
            $chatID = $request->getAttribute('id');

            $messageDAO = new MessageDAO(new MySQLDatabase());

            $messages = $messageDAO->getChatMessages($chatID);

            $result = [];
            foreach ($messages as $message) {
                $element = [];

                $element['id'] = $message->id;
                $element['body'] = $message->body;
                $element['date'] = $message->date;
                $element['senderId'] = $message->senderId;
                $element['senderName'] = $message->senderName;
                $element['chatId'] = $message->chatId;

                $result[] = $element;
            }

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }
    }
    