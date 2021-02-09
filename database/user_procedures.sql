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
	UPDATE Users
    SET
        username = username,
        account_name = account_name,
        account_lastname = account_lastname,
        user_email = user_email,
        user_description = user_description,
        last_change_date = CURRENT_TIMESTAMP()
	WHERE
		id_user = id_user;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS SetUserImage $$

CREATE PROCEDURE SetUserImage (
	IN id_user INT,
    IN user_image MEDIUMBLOB
)
BEGIN
	UPDATE Users
	SET
		user_image = user_image,
        last_change_date = CURRENT_TIMESTAMP()
    WHERE
		id_user = id_user;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetUserInfo $$

CREATE PROCEDURE GetUserInfo (
	IN id_user INT
)
BEGIN
	SELECT
		id_user,
		username,
		account_name,
		account_lastname,
		user_description,
		user_image,
		user_role,
		account_creation_date,
		last_change_date,
		account_state
    FROM
		Users
    WHERE
		id_user = id_user;
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