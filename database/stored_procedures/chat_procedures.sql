USE w2l_db_dev;

DELIMITER $$
DROP PROCEDURE IF EXISTS CreateChat $$

CREATE PROCEDURE CreateChat (
	IN id_sender INT,
    IN id_receptor INT,
    IN chat_name NVARCHAR(80)
)
BEGIN
	DECLARE chat_id INT;
	
    INSERT INTO Chats (
		chat_name
	)
	VALUES (
		chat_name
	);
	
	SET chat_id = LAST_INSERT_ID();
	
	INSERT INTO Users_Chats (
		user_id,
		chat_id
	)
	VALUES (
		sender_id,
		chat_id
	),
	(
		receptor_id,
		chat_id
	);
    
    SELECT chat_id;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetUserChats $$

CREATE PROCEDURE GetUserChats (
	IN id_user INT
)
BEGIN
	SELECT
		C.id_chat,
        C.chat_name
	FROM
		Chats AS C
        INNER JOIN Users_Chats AS UC ON UC.chat_id = C.id_chat
	WHERE
		UC.user_id = id_user;
END $$
DELIMITER ;