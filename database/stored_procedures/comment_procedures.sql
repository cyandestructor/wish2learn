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
    
    SELECT comment_id;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS HideComment $$

CREATE PROCEDURE HideComment (
	IN id_comment INT,
    IN hide BIT
)
BEGIN
	UPDATE Comments AS C
    SET
		C.published = hide
	WHERE
		C.id_comment = id_comment;
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
    IF up_vote = 1 AND NOT EXISTS (
		SELECT UU.id_comment
        FROM Users_Upvotes AS UU
        WHERE UU.comment_id = id_comment AND UU.user_id = id_user
	) THEN
		UPDATE Comments AS C
		SET
			C.comment_upvotes = C.comment_upvotes + 1
		WHERE
			C.id_comment = id_comment;
        
        INSERT INTO Users_Upvotes (
			user_id,
            comment_id
        )
        VALUES (
			id_user,
            id_comment
        );
	END IF;
    
    IF up_vote = 0 AND EXISTS (
		SELECT UU.id_comment
		FROM Users_Upvotes AS UU
		WHERE UU.comment_id = id_comment AND UU.user_id = id_user
	) THEN
		UPDATE Comments AS C
		SET
			C.comment_upvotes = C.comment_upvotes - 1
		WHERE
			C.id_comment = id_comment;
			
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
		CI.user_id,
        CI.username,
        CI.id_comment,
		CI.comment_body,
		CI.comment_upvotes,
		CI.comment_date,
		CI.comment_parent_id,
		CI.published
	FROM
		CommentsInfo AS CI
	WHERE
		CI.lesson_id = id_lesson;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetUserLessonComments $$

CREATE PROCEDURE GetUserLessonComments (
	in id_user int,
    IN id_lesson INT
)
BEGIN
	SELECT
		CI.user_id,
        CI.username,
        CI.id_comment,
		CI.comment_body,
		CI.comment_upvotes,
		CI.comment_date,
		CI.comment_parent_id,
		CI.published,
        if(
			exists(
				select
					UU.id_user_upvote
				from
					Users_Upvotes as UU
				where
					UU.user_id = id_user and UU.comment_id = CI.id_comment),
			1, 0) as comment_upvoted
	FROM
		CommentsInfo as CI
	WHERE
		CI.lesson_id = id_lesson;
END $$
DELIMITER ;