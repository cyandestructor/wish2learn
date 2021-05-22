<?php
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Slim\Factory\AppFactory;
    use Slim\Routing\RouteCollectorProxy;
    use Slim\Exception\HttpNotFoundException;

    use W2l\VideoUpload\AzureBlobStorageVideoUploader;

    require __DIR__ . '/../vendor/autoload.php';

    $app = AppFactory::create();
    
    $app->add(function ($request, $handler) {
        $response = $handler->handle($request);
        return $response
            ->withHeader('Access-Control-Allow-Origin', '*') // TODO: Change this for production
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    });

    $app->add(
        new \Slim\Middleware\Session([
            'name' => 'w2l_session',
            'autorefresh' => true,
            'lifetime' => '1 hour',
        ])
    );
    $app->addBodyParsingMiddleware();
    $app->addRoutingMiddleware();
    $errorMiddleware = $app->addErrorMiddleware(true, true, true); // TODO: Change this for production

    $app->setBasePath('/api');

    $app->options('/{routes:.+}', function ($request, $response, $args) {
        return $response;
    });

    $app->get('/', function (Request $request, Response $response, $args) {
        $response->getBody()->write("Hello world!");
        return $response;
    });

    // USERS
    $app->group('/users', function (RouteCollectorProxy $group) {
        $group->map(['GET', 'PUT', 'DELETE'], '/{id:[0-9]+}', function ($request, $response, $args) {
            $method = $request->getMethod();
            switch ($method) {
                case 'GET':
                    return W2l\Controllers\UsersController::getUnique($request, $response, $args);
                case 'PUT':
                    return W2l\Controllers\UsersController::putUser($request, $response, $args);
                case 'DELETE':
                    return W2l\Controllers\UsersController::deleteUser($request, $response, $args);
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

        $group->get('', W2l\Controllers\UsersController::class . ':checkUserExists');
        $group->post('', W2l\Controllers\UsersController::class . ':postUser');
    });

    $app->get('/courses/{id:[0-9]+}/users', W2l\Controllers\UsersController::class . ':getCourseEnrolledUsers');

    // SESSION
    $app->map(['GET', 'PUT', 'DELETE'], '/session', function ($request, $response, $args) {
        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                return W2l\Controllers\SessionController::getCurrent($request, $response, $args);
            case 'PUT':
                return W2l\Controllers\SessionController::login($request, $response, $args);
            case 'DELETE':
                return W2l\Controllers\SessionController::logout($request, $response, $args);
        }
        return $response;
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

        $group->group('/{id:[0-9]+}', function (RouteCollectorProxy $subgroup) {
            $subgroup->map(['GET', 'PUT', 'DELETE'], '', function ($request, $response, $args) {
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

            $subgroup->map(['GET', 'PUT'], '/image', function ($request, $response, $args) {
                $method = $request->getMethod();
                switch ($method) {
                    case 'GET':
                        return W2l\Controllers\CoursesController::getCourseImage($request, $response, $args);
                    case 'PUT':
                        return W2l\Controllers\CoursesController::putCourseImage($request, $response, $args);
                }
                return $response;
            });

            $subgroup->map(['GET', 'POST'], '/categories', function ($request, $response, $args) {
                $method = $request->getMethod();
                switch ($method) {
                    case 'GET':
                        return W2l\Controllers\CategoryController::getCourseCategories($request, $response, $args);
                    case 'POST':
                        return W2l\Controllers\CoursesController::addCourseCategory($request, $response, $args);
                }
                return $response;
            });

            $subgroup->delete('/categories/{categoryId:[0-9]+}',
                W2l\Controllers\CoursesController::class . ':deleteCourseCategory');
        });
    });

    $app->get('/users/{id:[0-9]+}/courses', W2l\Controllers\CoursesController::class . ':getUserCourses');

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

    $app->put('/users/{userId:[0-9]+}/lessons/{lessonId:[0-9]+}',
        W2l\Controllers\LessonController::class . ':setCompleted');

    // VIDEOS
    $app->map(['GET', 'PUT'], '/lessons/{id:[0-9]+}/video', function ($request, $response, $args) {
        $method = $request->getMethod();
        $videoController = new W2l\Controllers\VideoController(new AzureBlobStorageVideoUploader());
        switch ($method) {
            case 'GET':
                return $videoController->getLessonVideo($request, $response, $args);
            case 'PUT':
                return $videoController->putLessonVideo($request, $response, $args);
        }
        return $response;
    });

    $app->delete('/videos/{id:[0-9]+}', function (Request $request, Response $response, $args) {
        return W2l\Controllers\VideoController::deleteVideo($request, $response, $args);
    });

    // RESOURCES
    $app->map(['GET', 'DELETE'], '/resources/{id:[0-9]+}', function ($request, $response, $args) {
        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                return W2l\Controllers\ResourceController::getUnique($request, $response, $args);
            case 'DELETE':
                return W2l\Controllers\ResourceController::deleteResource($request, $response, $args);
        }
        return $response;
    });

    $app->map(['GET', 'POST'], '/lessons/{id:[0-9]+}/resources', function ($request, $response, $args) {
        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                return W2l\Controllers\ResourceController::getLessonResources($request, $response, $args);
            case 'POST':
                return W2l\Controllers\ResourceController::postResource($request, $response, $args);
        }
        return $response;
    });

    // SALES
    $app->post('/sales', W2l\Controllers\SaleController::class . ':postSale');
    $app->get('/users/{id:[0-9]+}/sales', W2l\Controllers\SaleController::class . ':getUserSales');

    // REVIEWS
    $app->map(['GET', 'PUT'], '/reviews/{id:[0-9]+}', function ($request, $response, $args) {
        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                return W2l\Controllers\ReviewController::getUnique($request, $response, $args);
            case 'PUT':
                return W2l\Controllers\ReviewController::putReview($request, $response, $args);
        }
        return $response;
    });

    $app->map(['GET', 'POST'], '/courses/{id:[0-9]+}/reviews', function ($request, $response, $args) {
        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                return W2l\Controllers\ReviewController::getCourseReviews($request, $response, $args);
            case 'POST':
                return W2l\Controllers\ReviewController::postReview($request, $response, $args);
        }
        return $response;
    });

    // CHATS
    $app->map(['GET', 'POST'], '/users/{id:[0-9]+}/chats', function ($request, $response, $args) {
        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                return W2l\Controllers\ChatController::getUserChats($request, $response, $args);
            case 'POST':
                return W2l\Controllers\ChatController::postChat($request, $response, $args);
        }
        return $response;
    });

    // MESSAGES
    $app->map(['GET', 'POST'], '/chats/{id:[0-9]+}/messages', function ($request, $response, $args) {
        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                return W2l\Controllers\MessageController::getChatMessages($request, $response, $args);
            case 'POST':
                return W2l\Controllers\MessageController::postMessage($request, $response, $args);
        }
        return $response;
    });

    // COMMENTS
    $app->map(['GET', 'POST'], '/lessons/{id:[0-9]+}/comments', function ($request, $response, $args) {
        $method = $request->getMethod();
        switch ($method) {
            case 'GET':
                return W2l\Controllers\CommentController::getLessonComments($request, $response, $args);
            case 'POST':
                return W2l\Controllers\CommentController::postComment($request, $response, $args);
        }
        return $response;
    });

    // CERTIFICATES
    $app->group('/certificates', function (RouteCollectorProxy $group) {
        $group->post('', W2l\Controllers\CertificateController::class . ':postCertificate');
        $group->get('/{id}', W2l\Controllers\CertificateController::class . ':getUnique');
    });

    $app->get('/users/{id:[0-9]+}/certificates', W2l\Controllers\CertificateController::class . ':getUserCertificates');

    // ENROLLMENTS
    $app->get('/users/{id:[0-9]+}/enrollments', W2l\Controllers\EnrollmentController::class . ':getUserEnrollments');
    $app->post('/enrollments', W2l\Controllers\EnrollmentController::class . ':postEnrollment');

    // RESULTS
    $app->get('/results', W2l\Controllers\ResultController::class . ':getList');

    $app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function ($request, $response) {
        throw new HttpNotFoundException($request);
    });

    $app->run();