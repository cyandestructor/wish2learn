<?php
    namespace Controllers;

    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    
    use Configuration\Database\MySQLDatabase;

    use Models\Certificate;
    use Models\CertificateDAO;

    class CertificateController
    {
        static public function postCertificate(Request $request, Response $response, $args)
        {
            $contentType = $request->getHeaderLine('Content-Type');
            if(!$contentType || $contentType != 'application/json'){
                return $response
                            ->withStatus(415);
            }

            $result = [];
            $data = $request->getParsedBody();

            // Certificate creation
            $certificateDAO = new CertificateDAO(new MySQLDatabase());

            $certificate = new Certificate();
            $certificate->userId = $data['userId'];
            $certificate->instructorId = $data['instructorId'];
            $certificate->courseId = $data['courseId'];

            $result['id'] = $certificateDAO->registerCertificate($certificate);
            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json')
                        ->withStatus(201);
        }

        static public function getUnique(Request $request, Response $response, $args)
        {
            $certificateID = $request->getAttribute('id');

            $certificateDAO = new CertificateDAO(new MySQLDatabase());
            $certificate = $certificateDAO->getCertificate($certificateID);

            if(!$certificate){
                return $response
                            ->withStatus(404);
            }

            $result = [];
            $result['id'] = $certificate->id;
            $result['userName'] = $certificate->userName;
            $result['instructorName'] = $certificate->instructorName;
            $result['courseTitle'] = $certificate->courseTitle;
            $result['expeditionDate'] = $certificate->expeditionDate;

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }

        static public function getUserCertificates(Request $request, Response $response, $args)
        {
            $userID = $request->getAttribute('id');

            $certificateDAO = new CertificateDAO(new MySQLDatabase());

            $certificates = $certificateDAO->getUserCertificates($userID);

            $result = [];
            foreach ($certificates as $certificate) {
                $element = [];

                $element['id'] = $certificate->id;
                $element['courseTitle'] = $certificate->courseTitle;
                $element['link'] = "/api/certificates/$certificate->id";

                $result[] = $element;
            }

            $response->getBody()->write(json_encode($result));
            return $response
                        ->withHeader('Content-Type', 'application/json');
        }
    }
    