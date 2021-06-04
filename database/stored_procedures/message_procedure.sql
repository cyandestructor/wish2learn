USE w2l_db_dev;

DELIMITER $$
DROP PROCEDURE IF EXISTS CreateMessage $$

CREATE PROCEDURE CreateMessage (
	IN id_sender INT,
    IN id_chat INT,
    IN message_body MEDIUMTEXT
)
BEGIN
    INSERT INTO Messages (
		message_body,
        message_date,
        user_sender_id,
        chat_id
    )
    VALUES (
		message_body,
        CURRENT_TIMESTAMP(),
        id_sender,
        id_chat
    );
    
    SELECT LAST_INSERT_ID();
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetChatMessages $$

CREATE PROCEDURE GetChatMessages (
	IN id_chat INT
)
BEGIN
	SELECT
		M.id_message,
		M.message_body,
		M.message_date,
        COALESCE(M.user_sender_id, 0) AS sender_id,
        COALESCE(U.username, 'User') AS sender_name,
        M.chat_id
	FROM
		Messages AS M
        LEFT JOIN Users AS U ON U.id_user = M.user_sender_id
	WHERE
		M.chat_id = id_chat;
END $$
DELIMITER ;