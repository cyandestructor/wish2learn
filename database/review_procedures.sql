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
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetCourseReviews $$

CREATE PROCEDURE GetCourseReviews (
	IN course_id INT
)
BEGIN
	SELECT
		R.id_review,
		R.review_body,
		R.review_date,
        CR.user_id,
        U.username,
        U.user_image,
		CR.grade
	FROM
		Reviews AS R
        INNER JOIN Courses_Reviews AS CR ON CR.review_id = R.id_review
        INNER JOIN Users AS U ON CR.user_id = U.id_user
	WHERE
		CR.course_id = course_id AND R.published = 1;
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