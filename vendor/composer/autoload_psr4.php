<?php

// autoload_psr4.php @generated by Composer

$vendorDir = dirname(dirname(__FILE__));
$baseDir = dirname($vendorDir);

return array(
    'Validators\\' => array($baseDir . '/api/src/validators'),
    'Symfony\\Polyfill\\Php80\\' => array($vendorDir . '/symfony/polyfill-php80'),
    'Slim\\Psr7\\' => array($vendorDir . '/slim/psr7/src'),
    'Slim\\' => array($vendorDir . '/slim/slim/Slim'),
    'Psr\\Log\\' => array($vendorDir . '/psr/log/Psr/Log'),
    'Psr\\Http\\Server\\' => array($vendorDir . '/psr/http-server-handler/src', $vendorDir . '/psr/http-server-middleware/src'),
    'Psr\\Http\\Message\\' => array($vendorDir . '/psr/http-factory/src', $vendorDir . '/psr/http-message/src'),
    'Psr\\Container\\' => array($vendorDir . '/psr/container/src'),
    'Models\\' => array($baseDir . '/api/src/models'),
    'Fig\\Http\\Message\\' => array($vendorDir . '/fig/http-message-util/src'),
    'FastRoute\\' => array($vendorDir . '/nikic/fast-route/src'),
    'Controllers\\' => array($baseDir . '/api/src/controllers'),
    'Configuration\\Database\\' => array($baseDir . '/api/config'),
);