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

    // USERS
    $app->group('/users', function (RouteCollectorProxy $group) {
        $group->map(['GET', 'PUT'], '/{id:[0-9]+}', function ($request, $response, $args) {
            $method = $request->getMethod();
            switch ($method) {
                case 'GET':
                    return W2l\Controllers\UsersController::getUnique($request, $response, $args);
                case 'PUT':
                    return W2l\Controllers\UsersController::putUser($request, $response, $args);
            }
            return $response;
        });

        $group->map(['GET', 'PUT'], '/{id:[0-9]+}/avatar', function ($request, $response, $args) {
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

    // CATEGORIES
    $app->group('/categories', function (RouteCollectorProxy $group) {
        $group->map(['GET', 'POST'], '', function ($request, $response, $args) {
            $method = $request->getMethod();
            switch ($method) {
                case 'GET':
                    return W2l\Controllers\CategoryController::getList($request, $response, $args);
                case 'POST':
                    return W2l\Controllers\CategoryController::postCategory($request, $response, $args);
            }
            return $response;
        });

        $group->map(['GET', 'PUT', 'DELETE'], '/{id:[0-9]+}', function ($request, $response, $args) {
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

    // COURSES
    $app->group('/courses', function (RouteCollectorProxy $group) {
        $group->map(['GET', 'POST'], '', function ($request, $response, $args) {
            $method = $request->getMethod();
            switch ($method) {
                case 'GET':
                    return W2l\Controllers\CoursesController::getList($request, $response, $args);
                case 'POST':
                    return W2l\Controllers\CoursesController::postCourse($request, $response, $args);
            }
            return $response;
        });

        $group->map(['GET', 'PUT', 'DELETE'], '/{id:[0-9]+}', function ($request, $response, $args) {
            $method = $request->getMethod();
            switch ($method) {
                case 'GET':
                    return W2l\Controllers\CoursesController::getUnique($request, $response, $args);
                case 'PUT':
                    return W2l\Controllers\CoursesController::putCourse($request, $response, $args);
                case 'DELETE':
                    return W2l\Controllers\CoursesController::deleteCourse($request, $response, $args);
            }
            return $response;
        });

        $group->map(['GET', 'PUT'], '/{id:[0-9]+}/image', function ($request, $response, $args) {
            $method = $request->getMethod();
            switch ($method) {
                case 'GET':
                    return W2l\Controllers\CoursesController::getCourseImage($request, $response, $args);
                case 'PUT':
                    return W2l\Controllers\CoursesController::putCourseImage($request, $response, $args);
            }
            return $response;
        });
    });

    // SECTIONS
    $app->map(['GET', 'PUT', 'DELETE'], '/sections/{id:[0-9]+}', function ($request, $response, $args) {
        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                return W2l\Controllers\SectionController::getUnique($request, $response, $args);
            case 'PUT':
                return W2l\Controllers\SectionController::putSection($request, $response, $args);
            case 'DELETE':
                return W2l\Controllers\SectionController::deleteSection($request, $response, $args);
        }
        return $response;
    });

    $app->map(['GET', 'POST'], '/courses/{id:[0-9]+}/sections', function ($request, $response, $args) {
        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                return W2l\Controllers\SectionController::getCourseSections($request, $response, $args);
            case 'POST':
                return W2l\Controllers\SectionController::postSection($request, $response, $args);
        }
        return $response;
    });

    // LESSONS
    $app->map(['GET', 'PUT', 'DELETE'], '/lessons/{id:[0-9]+}', function ($request, $response, $args) {
        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                return W2l\Controllers\LessonController::getUnique($request, $response, $args);
            case 'PUT':
                return W2l\Controllers\LessonController::putLesson($request, $response, $args);
            case 'DELETE':
                return W2l\Controllers\LessonController::deleteLesson($request, $response, $args);
        }
        return $response;
    });

    $app->map(['GET', 'POST'], '/sections/{id:[0-9]+}/lessons', function ($request, $response, $args) {
        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                return W2l\Controllers\LessonController::getSectionLessons($request, $response, $args);
            case 'POST':
                return W2l\Controllers\LessonController::postLesson($request, $response, $args);
        }
        return $response;
    });
    $app->run();