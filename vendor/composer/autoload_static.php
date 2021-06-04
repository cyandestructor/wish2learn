<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitd7f742ca9fa88a83efb04001cdd301e1
{
    public static $files = array (
        '7b11c4dc42b3b3023073cb14e519683c' => __DIR__ . '/..' . '/ralouphie/getallheaders/src/getallheaders.php',
        'a0edc8309cc5e1d60e3047b5df6b7052' => __DIR__ . '/..' . '/guzzlehttp/psr7/src/functions_include.php',
        'c964ee0ededf28c96ebd9db5099ef910' => __DIR__ . '/..' . '/guzzlehttp/promises/src/functions_include.php',
        'a4a119a56e50fbb293281d9a48007e0e' => __DIR__ . '/..' . '/symfony/polyfill-php80/bootstrap.php',
        '37a3dc5111fe8f707ab4c132ef1dbc62' => __DIR__ . '/..' . '/guzzlehttp/guzzle/src/functions_include.php',
        '253c157292f75eb38082b5acb06f3f01' => __DIR__ . '/..' . '/nikic/fast-route/src/functions.php',
    );

    public static $prefixLengthsPsr4 = array (
        'W' => 
        array (
            'W2l\\VideoUpload\\' => 16,
            'W2l\\Validators\\' => 15,
            'W2l\\Models\\Dto\\' => 15,
            'W2l\\Models\\' => 11,
            'W2l\\Controllers\\' => 16,
            'W2l\\Configuration\\Database\\' => 27,
        ),
        'S' => 
        array (
            'Symfony\\Polyfill\\Php80\\' => 23,
            'Slim\\Psr7\\' => 10,
            'Slim\\' => 5,
        ),
        'P' => 
        array (
            'Psr\\Log\\' => 8,
            'Psr\\Http\\Server\\' => 16,
            'Psr\\Http\\Message\\' => 17,
            'Psr\\Http\\Client\\' => 16,
            'Psr\\Container\\' => 14,
        ),
        'M' => 
        array (
            'MicrosoftAzure\\Storage\\Common\\' => 30,
            'MicrosoftAzure\\Storage\\Blob\\' => 28,
        ),
        'G' => 
        array (
            'GuzzleHttp\\Psr7\\' => 16,
            'GuzzleHttp\\Promise\\' => 19,
            'GuzzleHttp\\' => 11,
        ),
        'F' => 
        array (
            'Fig\\Http\\Message\\' => 17,
            'FastRoute\\' => 10,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'W2l\\VideoUpload\\' => 
        array (
            0 => __DIR__ . '/../..' . '/api/src/classes/videoUpload',
        ),
        'W2l\\Validators\\' => 
        array (
            0 => __DIR__ . '/../..' . '/api/src/validators',
        ),
        'W2l\\Models\\Dto\\' => 
        array (
            0 => __DIR__ . '/../..' . '/api/src/models',
        ),
        'W2l\\Models\\' => 
        array (
            0 => __DIR__ . '/../..' . '/api/src/models',
        ),
        'W2l\\Controllers\\' => 
        array (
            0 => __DIR__ . '/../..' . '/api/src/controllers',
        ),
        'W2l\\Configuration\\Database\\' => 
        array (
            0 => __DIR__ . '/../..' . '/api/config',
        ),
        'Symfony\\Polyfill\\Php80\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/polyfill-php80',
        ),
        'Slim\\Psr7\\' => 
        array (
            0 => __DIR__ . '/..' . '/slim/psr7/src',
        ),
        'Slim\\' => 
        array (
            0 => __DIR__ . '/..' . '/slim/slim/Slim',
        ),
        'Psr\\Log\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/log/Psr/Log',
        ),
        'Psr\\Http\\Server\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/http-server-handler/src',
            1 => __DIR__ . '/..' . '/psr/http-server-middleware/src',
        ),
        'Psr\\Http\\Message\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/http-factory/src',
            1 => __DIR__ . '/..' . '/psr/http-message/src',
        ),
        'Psr\\Http\\Client\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/http-client/src',
        ),
        'Psr\\Container\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/container/src',
        ),
        'MicrosoftAzure\\Storage\\Common\\' => 
        array (
            0 => __DIR__ . '/..' . '/microsoft/azure-storage-common/src/Common',
        ),
        'MicrosoftAzure\\Storage\\Blob\\' => 
        array (
            0 => __DIR__ . '/..' . '/microsoft/azure-storage-blob/src/Blob',
        ),
        'GuzzleHttp\\Psr7\\' => 
        array (
            0 => __DIR__ . '/..' . '/guzzlehttp/psr7/src',
        ),
        'GuzzleHttp\\Promise\\' => 
        array (
            0 => __DIR__ . '/..' . '/guzzlehttp/promises/src',
        ),
        'GuzzleHttp\\' => 
        array (
            0 => __DIR__ . '/..' . '/guzzlehttp/guzzle/src',
        ),
        'Fig\\Http\\Message\\' => 
        array (
            0 => __DIR__ . '/..' . '/fig/http-message-util/src',
        ),
        'FastRoute\\' => 
        array (
            0 => __DIR__ . '/..' . '/nikic/fast-route/src',
        ),
    );

    public static $fallbackDirsPsr4 = array (
        0 => __DIR__ . '/..' . '/bryanjhv/slim-session/src',
    );

    public static $classMap = array (
        'Attribute' => __DIR__ . '/..' . '/symfony/polyfill-php80/Resources/stubs/Attribute.php',
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'Stringable' => __DIR__ . '/..' . '/symfony/polyfill-php80/Resources/stubs/Stringable.php',
        'UnhandledMatchError' => __DIR__ . '/..' . '/symfony/polyfill-php80/Resources/stubs/UnhandledMatchError.php',
        'ValueError' => __DIR__ . '/..' . '/symfony/polyfill-php80/Resources/stubs/ValueError.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitd7f742ca9fa88a83efb04001cdd301e1::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitd7f742ca9fa88a83efb04001cdd301e1::$prefixDirsPsr4;
            $loader->fallbackDirsPsr4 = ComposerStaticInitd7f742ca9fa88a83efb04001cdd301e1::$fallbackDirsPsr4;
            $loader->classMap = ComposerStaticInitd7f742ca9fa88a83efb04001cdd301e1::$classMap;

        }, null, ClassLoader::class);
    }
}
