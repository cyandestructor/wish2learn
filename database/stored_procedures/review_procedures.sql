USE w2l_db_dev;

DELIMITER $$
DROP PROCEDURE IF EXISTS CreateReview $$

CREATE PROCEDURE CreateReview (
	IN review_body TEXT,
    IN id_course INT,
    IN id_user INT,
    IN grade TINYINT
)
BEGIN
	DECLARE review_id INT;
    
    INSERT INTO Reviews (
		review_body,
		review_date
    )
    VALUES (
		review_body,
        CURRENT_TIMESTAMP()
    );
    
    SET review_id = LAST_INSERT_ID();
    
    INSERT INTO Courses_Reviews (
		course_id,
		review_id,
		user_id,
		grade
    )
    VALUES (
		id_course,
		review_id,
		id_user,
		grade
    );
    
    SELECT review_id;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS EditReview $$

CREATE PROCEDURE EditReview (
	IN review_id INT,
	IN review_body TEXT,
    IN grade TINYINT,
    IN published BIT
)
BEGIN
	UPDATE Reviews AS R
    SET
		R.review_body = review_body,
        R.published = published
	WHERE
		R.id_review = review_id;
        
	UPDATE Courses_Reviews AS CR
    SET
		CR.grade = grade
	WHERE
		CR.review_id = review_id;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetCourseReviews $$

CREATE PROCEDURE GetCourseReviews (
	IN course_id INT,
    IN total_rows INT,
    IN row_offset INT
)
BEGIN
	SELECT
		R.id_review,
		R.review_body,
		R.review_date,
        CR.user_id,
        U.username,
		CR.grade
	FROM
		Reviews AS R
        INNER JOIN Courses_Reviews AS CR ON CR.review_id = R.id_review
        INNER JOIN Users AS U ON CR.user_id = U.id_user
	WHERE
		CR.course_id = course_id AND R.published = 1
	LIMIT
		total_rows
	OFFSET
		row_offset;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetReview $$

CREATE PROCEDURE GetReview (
	IN review_id INT
)
BEGIN
	SELECT
		R.id_review,
		R.review_body,
		R.review_date,
        CR.course_id,
        CR.user_id,
        U.username,
		CR.grade,
        R.published
	FROM
		Reviews AS R
        INNER JOIN Courses_Reviews AS CR ON CR.review_id = R.id_review
        INNER JOIN Users AS U ON CR.user_id = U.id_user
	WHERE
		R.id_review = review_id;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetUserCourseReview $$

CREATE PROCEDURE GetUserCourseReview (
	IN user_id INT,
    IN course_id INT
)
BEGIN
	SELECT
		R.id_review,
		R.review_body,
		R.review_date,
        CR.user_id,
        U.username,
		CR.grade,
        R.published
	FROM
		Reviews AS R
        INNER JOIN Courses_Reviews AS CR ON CR.review_id = R.id_review
        INNER JOIN Users AS U ON CR.user_id = U.id_user
	WHERE
		CR.course_id = course_id AND CR.user_id = user_id;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS HideReview $$

CREATE PROCEDURE HideReview (
	IN id_review INT,
    IN hide BIT
)
BEGIN
	UPDATE Reviews
	SET
		published = hide
	WHERE
		id_review = id_review;
END $$
DELIMITER ;