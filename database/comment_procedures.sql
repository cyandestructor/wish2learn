USE w2l_db_dev;

DELIMITER $$
DROP PROCEDURE IF EXISTS CreateComment $$

CREATE PROCEDURE CreateComment (
	IN id_user INT,
    IN id_lesson INT,
	IN comment_body TEXT,
    IN comment_parent_id INT
)
BEGIN
	DECLARE comment_id INT;
    
    INSERT INTO Comments (
		comment_body,
		comment_date,
		comment_parent_id
	)
	VALUES (
		comment_body,
		CURRENT_TIMESTAMP(),
		comment_parent_id
	);
    
    SET comment_id = LAST_INSERT_ID();
    
    INSERT INTO Users_Comments (
		user_id,
        comment_id,
        lesson_id
    )
    VALUES (
		id_user,
        comment_id,
        id_lesson
    );
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS HideComment $$

CREATE PROCEDURE HideComment (
	IN id_comment INT,
    IN hide BIT
)
BEGIN
	UPDATE Comments
    SET
		published = hide
	WHERE
		id_comment = id_comment;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS VoteComment $$

CREATE PROCEDURE VoteComment (
	IN id_comment INT,
    IN id_user INT,
    IN up_vote BIT
)
BEGIN
    IF up_vote = 1 AND NOT EXISTS (SELECT id_comment FROM Users_Upvotes WHERE comment_id = id_comment AND user_id = id_user) THEN
		UPDATE Comments
		SET
			comment_upvotes = comment_upvotes + 1
		WHERE
			id_comment = id_comment;
        
        INSERT INTO Users_Upvotes (
			user_id,
            comment_id
        )
        VALUES (
			id_user,
            id_comment
        );
	ELSE
		UPDATE Comments
		SET
			comment_upvotes = comment_upvotes - 1
		WHERE
			id_comment = id_comment;
            
		DELETE FROM Users_Upvotes
        WHERE
			comment_id = id_comment AND user_id = id_user;
	END IF;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetLessonComments $$

CREATE PROCEDURE GetLessonComments (
	IN id_lesson INT
)
BEGIN
	SELECT
		C.id_comment,
		C.comment_body,
		C.comment_upvotes,
		C.comment_date,
		C.comment_parent_id,
		C.published
	FROM
		Comments AS C
        INNER JOIN Users_Comments AS UC ON UC.comment_id = C.id_comment
	WHERE
		UC.lesson_id = id_lesson;
END $$
DELIMITER ;