<?php
    namespace W2l\Models;

    use W2l\Configuration\Database\DatabaseInterface;
    use W2l\Models\Dto\Certificate;

    class CertificateDAO
    {
        private $connection;
        
        public function __construct(DatabaseInterface $db)
        {
            $this->connection = $db->connect();
        }

        public function registerCertificate(Certificate $certificate)
        {
            $certificateID = null;

            $sql = 'CALL RegisterCertificate(?, ?, ?)';
            
            $statement = $this->connection->prepare($sql);
            
            $statement->execute([
                $certificate->userId,
                $certificate->instructorId,
                $certificate->courseId
            ]);

            $statement->bindColumn(1, $certificateID);
            $statement->fetch(\PDO::FETCH_BOUND);

            return $certificateID;
        }

        public function getCertificate($certificateID)
        {
            $certificate = new Certificate();
            
            $sql = 'CALL GetCertificate(?)';

            $statement = $this->connection->prepare($sql);
            $statement->bindParam(1, $certificateID);
            $statement->execute();

            if($row = $statement->fetch()){
                $certificate->id = $row['certificate_id'];
                $certificate->userName = $row['user_name'];
                $certificate->instructorName = $row['instructor_name'];
                $certificate->courseTitle = $row['course_title'];
                $certificate->expeditionDate = $row['expedition_date'];
                return $certificate;
            }
            else{
                return null;
            }
        }

        public function getUserCertificates($userID)
        {
            $certificates = [];

            $sql = 'CALL GetUserCertificates(?)';

            $statement = $this->connection->prepare($sql);
            $statement->execute([
                $userID
            ]);

            while($row = $statement->fetch()){
                $certificate = new Certificate();

                $certificate->id = $row['certificate_id'];
                $certificate->courseTitle = $row['course_title'];

                $certificates[] = $certificate;
            }

            return $certificates ;
        }
    }
    