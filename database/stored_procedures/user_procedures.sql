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
    IN user_description TEXT
)
BEGIN
	UPDATE Users as U
    SET
        U.username = username,
        U.account_name = account_name,
        U.account_lastname = account_lastname,
        U.user_email = user_email,
        U.user_description = user_description,
        U.last_change_date = CURRENT_TIMESTAMP()
	WHERE
		U.id_user = id_user;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS SetUserImage $$

CREATE PROCEDURE SetUserImage (
	IN id_user INT,
    IN user_image MEDIUMBLOB
)
BEGIN
	UPDATE Users as U
	SET
		U.user_image = user_image,
        U.last_change_date = CURRENT_TIMESTAMP()
    WHERE
		U.id_user = id_user;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetUserImage $$

CREATE PROCEDURE GetUserImage (
	IN id_user INT
)
BEGIN
	SELECT
		U.user_image
	FROM
		Users as U
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
		Users as U
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
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS UserLogin $$

CREATE PROCEDURE UserLogin (
	IN user_input NVARCHAR(60),
    IN user_password VARCHAR(255)
)
BEGIN
	SELECT
		id_user,
		username,
		user_image,
		user_role,
		account_state
    FROM
		Users
    WHERE
		user_input IN (username, user_email) AND user_password = user_password;
END $$
DELIMITER ;