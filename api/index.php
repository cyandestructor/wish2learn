<?php
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Slim\Factory\AppFactory;
    use Slim\Routing\RouteCollectorProxy;

    require __DIR__ . '/../vendor/autoload.php';

    $app = AppFactory::create();

    $app->setBasePath('/api');

    $app->get('/', function (Request $request, Response $response, $args) {
        $response->getBody()->write("Hello world!");
        return $response;
    });

    $app->group('/users', function (RouteCollectorProxy $group) {
        $group->map(['GET', 'PUT'], '/{id:[0-9]+}', function ($request, $response, $args){
            $method = $request->getMethod();
            switch ($method) {
                case 'GET':
                    return Controllers\UsersController::getUnique($request, $response, $args);
                case 'PUT':
                    return Controllers\UsersController::putUser($request, $response, $args);
            }
            return $response;
        });

        $group->map(['GET', 'PUT'], '/{id:[0-9]+}/avatar', function ($request, $response, $args){
            $method = $request->getMethod();
            switch ($method) {
                case 'GET':
                    return Controllers\UsersController::getUserAvatar($request, $response, $args);
                case 'PUT':
                    return Controllers\UsersController::putUserAvatar($request, $response, $args);
            }
            return $response;
        });

        $group->post('', Controllers\UsersController::class . ':postUser');
    });

    $app->run();