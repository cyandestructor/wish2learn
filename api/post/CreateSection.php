<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    require_once($_SERVER['DOCUMENT_ROOT'] . '/api/validators/section/SectionValidator.php');

    $data = json_decode(file_get_contents('php://input'), TRUE);

    $validation = new SectionValidator($data);
    $errors = $validation->validateForm();

    $result = [];
    if (count($errors) > 0) {
        $result['status'] = 'error';
        $result['message'] = 'Information is not valid';
        $result['errors'] = $errors;
    }
    else {
        $result['status'] = 'ok';
        $result['message'] = 'Information is valid';
    }

    echo json_encode($result);