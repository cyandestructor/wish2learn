USE w2l_db_dev;

DELIMITER $$
DROP PROCEDURE IF EXISTS RegisterUser $$

CREATE PROCEDURE RegisterUser (
    IN username NVARCHAR(50),
    IN account_name NVARCHAR(50),
    IN account_lastname NVARCHAR(50),
    IN user_email NVARCHAR(60),
    IN user_password VARCHAR(255)
)
BEGIN
	INSERT INTO Users (
		username,
		account_name,
		account_lastname,
		user_email,
		user_password,
		account_creation_date,
		last_change_date
	)
	VALUES (
		username,
		account_name,
		account_lastname,
		user_email,
		user_password,
		CURRENT_DATE(),
		CURRENT_TIMESTAMP()
	);
    
    SELECT LAST_INSERT_ID();
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS EditUser $$

CREATE PROCEDURE EditUser (
	IN id_user INT,
	IN username NVARCHAR(50),
	IN account_name NVARCHAR(50),
    IN account_lastname NVARCHAR(50),
    IN user_email NVARCHAR(60),
    IN user_description TEXT,
    IN user_role TINYINT
)
BEGIN
	UPDATE Users AS U
    SET
        U.username = username,
        U.account_name = account_name,
        U.account_lastname = account_lastname,
        U.user_email = user_email,
        U.user_description = user_description,
        U.user_role = user_role,
        U.last_change_date = CURRENT_TIMESTAMP()
	WHERE
		U.id_user = id_user;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS SetUserImage $$

CREATE PROCEDURE SetUserImage (
	IN id_user INT,
    IN user_image MEDIUMBLOB,
    IN content_type VARCHAR(50)
)
BEGIN
	UPDATE Users AS U
	SET
		U.user_image = user_image,
        U.image_content_type = content_type,
        U.last_change_date = CURRENT_TIMESTAMP()
    WHERE
		U.id_user = id_user;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS UserExists $$

CREATE PROCEDURE UserExists (
	IN username NVARCHAR(50),
    IN email NVARCHAR(60)
)
BEGIN
	SELECT
		COUNT(*)
	FROM
		Users AS U
	WHERE
		U.username = username OR U.user_email = email;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetUserImage $$

CREATE PROCEDURE GetUserImage (
	IN id_user INT
)
BEGIN
	SELECT
		U.user_image,
        U.image_content_type
	FROM
		Users AS U
	WHERE
		U.id_user = id_user;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS DeleteUser $$

CREATE PROCEDURE DeleteUser (
	IN user_id INT
)
BEGIN
	DELETE FROM Users
    WHERE
		id_user = user_id;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetUserInfo $$

CREATE PROCEDURE GetUserInfo (
	IN id_user INT
)
BEGIN
	SELECT
		U.id_user,
		U.username,
		U.account_name,
		U.account_lastname,
        U.user_email,
		U.user_description,
		U.user_role,
		U.account_creation_date,
		U.last_change_date,
		U.account_state
    FROM
		Users AS U
    WHERE
		U.id_user = id_user;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS EnrollUser $$

CREATE PROCEDURE EnrollUser (
	IN id_user INT,
    IN id_course INT
)
BEGIN
	IF NOT EXISTS(
		SELECT
			UC.id_user_course
        FROM
			Users_Courses AS UC
		WHERE
			UC.user_id = id_user AND UC.course_id = id_course
	) THEN
		INSERT INTO Users_Courses (
			user_id,
			course_id,
			enroll_date
		)
		VALUES (
			id_user,
			id_course,
			CURRENT_DATE()
		);
    END IF;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS UserLogin $$

CREATE PROCEDURE UserLogin (
	IN user_input NVARCHAR(60)
)
BEGIN
	SELECT
		U.id_user,
		U.username,
		U.user_role,
		U.account_state,
        U.user_password
    FROM
		Users AS U
    WHERE
		user_input IN (U.username, U.user_email);
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetCourseEnrolledUsers $$

CREATE PROCEDURE GetCourseEnrolledUsers (
	IN id_course INT
)
BEGIN
	SELECT
		U.id_user,
        U.username,
        U.account_name,
        U.account_lastname,
        UC.enroll_date,
        CI.total_lessons AS course_total_lessons,
        userLessonsCompleted(U.id_user, UC.course_id) AS lessons_completed
	FROM
		Users AS U
        INNER JOIN Users_Courses AS UC ON UC.user_id = U.id_user
        INNER JOIN CoursesInfo AS CI ON CI.id_course = UC.course_id
	WHERE
		UC.course_id = id_course;
END $$
DELIMITER ;