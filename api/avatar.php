<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/api/manager/ApiManager.php');
    require_once($_SERVER['DOCUMENT_ROOT'] . '/api/resources/AvatarResource.php');

    $manager = new ApiManager(new AvatarResource());

    echo($manager->getResponse()->send());