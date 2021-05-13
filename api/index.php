<?php
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Slim\Factory\AppFactory;
    use Slim\Routing\RouteCollectorProxy;

    require __DIR__ . '/../vendor/autoload.php';

    $app = AppFactory::create();
    
    $app->addBodyParsingMiddleware();
    $app->addRoutingMiddleware();
    $errorMiddleware = $app->addErrorMiddleware(true, true, true);

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
                    return W2l\Controllers\UsersController::getUnique($request, $response, $args);
                case 'PUT':
                    return W2l\Controllers\UsersController::putUser($request, $response, $args);
            }
            return $response;
        });

        $group->map(['GET', 'PUT'], '/{id:[0-9]+}/avatar', function ($request, $response, $args){
            $method = $request->getMethod();
            switch ($method) {
                case 'GET':
                    return W2l\Controllers\UsersController::getUserAvatar($request, $response, $args);
                case 'PUT':
                    return W2l\Controllers\UsersController::putUserAvatar($request, $response, $args);
            }
            return $response;
        });

        $group->post('', W2l\Controllers\UsersController::class . ':postUser');
    });

    $app->group('/categories', function (RouteCollectorProxy $group) {
        $group->map(['GET', 'POST'], '', function ($request, $response, $args){
            $method = $request->getMethod();
            switch ($method) {
                case 'GET':
                    return W2l\Controllers\CategoryController::getList($request, $response, $args);
                case 'POST':
                    return W2l\Controllers\CategoryController::postCategory($request, $response, $args);
            }
            return $response;
        });

        $group->map(['GET', 'PUT', 'DELETE'], '/{id:[0-9]+}', function ($request, $response, $args){
            $method = $request->getMethod();
            switch ($method) {
                case 'GET':
                    return W2l\Controllers\CategoryController::getUnique($request, $response, $args);
                case 'PUT':
                    return W2l\Controllers\CategoryController::putCategory($request, $response, $args);
                case 'DELETE':
                    return W2l\Controllers\CategoryController::deleteCategory($request, $response, $args);
            }
            return $response;
        });
    });

    $app->run();