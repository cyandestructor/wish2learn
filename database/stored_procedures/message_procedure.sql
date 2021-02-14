USE w2l_db_dev;

DELIMITER $$
DROP PROCEDURE IF EXISTS CreateMessage $$

CREATE PROCEDURE CreateMessage (
	IN id_sender INT,
    IN id_receptor INT,
    IN message_body MEDIUMTEXT
)
BEGIN
	DECLARE message_id INT;
    
    INSERT INTO Messages (
		message_body,
        message_date
    )
    VALUES (
		message_body,
        CURRENT_TIMESTAMP()
    );
    
    SET message_id = LAST_INSERT_ID();
    
    INSERT INTO Users_Messages (
		user_sender_id,
		user_receptor_id,
		message_id
    )
    VALUES (
		id_sender,
        id_receptor,
        message_id
    );
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetMessages $$

CREATE PROCEDURE GetMessages (
	IN id_sender INT,
    IN id_receptor INT
)
BEGIN
	SELECT
		M.id_message,
		M.message_body,
		M.message_date
	FROM
		Messages AS M
        INNER JOIN Users_Messages AS UM ON UM.message_id = M.id_message
	WHERE
		UM.id_sender = id_sender AND UM.id_receptor = id_receptor;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetUserChats $$

CREATE PROCEDURE GetUserChats (
	IN id_user INT
)
BEGIN
	-- TODO: Check how to improve this
	SELECT
		user_sender_id,
		user_receptor_id,
        COUNT(*) AS total_messages
	FROM
		Users_Messages
	WHERE
		id_user in (user_receptor_id, user_sender_id)
	GROUP BY
		user_sender_id, user_receptor_id;
END $$
DELIMITER ;