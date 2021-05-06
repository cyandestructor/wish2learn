<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/api/manager/ApiManager.php');
    require_once($_SERVER['DOCUMENT_ROOT'] . '/api/resources/UsersResource.php');

    $manager = new ApiManager(new UsersResource());

    echo($manager->getResponse()->send());