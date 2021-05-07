USE w2l_db_dev;

DELIMITER $$
DROP PROCEDURE IF EXISTS RegisterCertificate $$

CREATE PROCEDURE RegisterCertificate (
    IN id_user INT,
    IN id_instructor INT,
    IN id_course INT
)
BEGIN
	DECLARE certificate_id BINARY(16);
    DECLARE user_name NVARCHAR(150);
    DECLARE instructor_name NVARCHAR(150);
    DECLARE course_title NVARCHAR(70);
    
    SET certificate_id = UUID_TO_BIN(UUID());
    SET user_name = (SELECT CONCAT(account_name, " ", account_lastname) FROM Users WHERE id_user = id_user);
    SET instructor_name = (SELECT CONCAT(account_name, " ", account_lastname) FROM Users WHERE id_user = id_instructor);
    SET course_title = (SELECT course_title FROM Courses WHERE id_course = id_course);
    
    INSERT INTO Certificates (
		id_certificate,
		user_name,
		instructor_name,
		course_title,
		expedition_date
    )
    VALUES (
		certificate_id,
		user_name,
		instructor_name,
		course_title,
		CURRENT_DATE()
    );
    
    INSERT INTO Users_Certificates (
		user_id,
		course_id,
		certificate_id
    )
    VALUES (
		id_user,
        id_course,
        certificate_id
    );
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetCertificate $$

CREATE PROCEDURE GetCertificate (
	IN certificate_id VARCHAR(36)
)
BEGIN
	SELECT
		BIN_TO_UUID(id_certificate) AS certificate_id,
		user_name,
		instructor_name,
		course_title,
		expedition_date
	FROM
		Certificates
	WHERE
		id_certificate = UUID_TO_BIN(certificate_id);
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetUserCertificates $$

CREATE PROCEDURE GetUserCertificates (
	IN id_user INT
)
BEGIN
	SELECT
		BIN_TO_UUID(C.id_certificate) AS certificate_id,
        C.course_title
	FROM
		Certificates AS C
        INNER JOIN Users_Certificates AS UC ON UC.certificate_id = U.id_certificate
	WHERE
		UC.user_id = id_user;
END $$
DELIMITER ;