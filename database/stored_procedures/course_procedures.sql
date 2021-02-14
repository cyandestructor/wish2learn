USE w2l_db_dev;

DELIMITER $$
DROP PROCEDURE IF EXISTS CreateCourse $$

CREATE PROCEDURE CreateCourse (
    IN course_title NVARCHAR(70),
    IN course_description TEXT,
    IN course_image MEDIUMBLOB,
    IN course_price DECIMAL(15, 2),
    IN instructor_id INT
)
BEGIN
	DECLARE product_id INT;

	INSERT INTO Products (
		product_name,
        product_price
    )
    VALUES (
		course_title,
        course_price
    );

	SET product_id = LAST_INSERT_ID();

	INSERT INTO Courses (
		course_title,
		course_description,
		course_image,
        product_id,
		instructor_id,
		publication_date,
		last_update
    )
    VALUES (
		course_title,
		course_description,
		course_image,
        product_id,
		instructor_id,
		CURRENT_TIMESTAMP(),
		CURRENT_TIMESTAMP()
    );
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS EditCourse $$

CREATE PROCEDURE EditCourse (
	IN id_course INT,
	IN course_title NVARCHAR(70),
    IN course_description TEXT,
    IN course_price DECIMAL(15, 2)
)
BEGIN
	UPDATE Courses
    SET
		course_title = course_title,
		course_description = course_description
	WHERE
		id_course = id_course;
        
	UPDATE
		Products AS P
		INNER JOIN Courses AS C ON C.product_id = P.id_product
    SET
		P.product_name = C.course_title,
		P.product_price = course_price
	WHERE
		C.id_course = id_course;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS SetCourseImage $$

CREATE PROCEDURE SetCourseImage (
	IN id_course INT,
	IN course_image MEDIUMBLOB
)
BEGIN
	UPDATE Courses
    SET
		course_image = course_image
	WHERE
		id_course = id_course;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS DeleteCourse $$

CREATE PROCEDURE DeleteCourse (
	IN id_course INT
)
BEGIN
	DELETE FROM Courses
    WHERE id_course = id_course;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetCourses $$

CREATE PROCEDURE GetCourses (
	IN only_published BIT
)
BEGIN
	IF only_published = 1 THEN
		SELECT
			id_course,
			course_title,
			course_description,
			course_image,
			course_price,
			instructor_id,
			publication_date,
			last_update,
            course_grade,
            total_students,
            published
		FROM
			CoursesInfo
		WHERE
			published = 1;
    ELSE
		SELECT
			id_course,
			course_title,
			course_description,
			course_image,
			course_price,
			instructor_id,
			publication_date,
			last_update,
			course_grade,
            total_students,
            published
		FROM
			CoursesInfo;
    END IF;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetTopRatedCourses $$

CREATE PROCEDURE GetTopRatedCourses (
	IN total_rows INT
)
BEGIN
	SELECT
		id_course,
		course_title,
		course_description,
		course_image,
		course_price,
		instructor_id,
		publication_date,
		last_update,
		course_grade,
        total_students,
		published
	FROM
		CoursesInfo
	WHERE
		published = 1
	ORDER BY
		course_grade, last_update DESC
	LIMIT TOTAL_ROWS;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetTopSellsCourses $$

CREATE PROCEDURE GetTopSellsCourses (
	IN total_rows INT
)
BEGIN
	SELECT
		id_course,
		course_title,
		course_description,
		course_image,
		course_price,
		instructor_id,
		publication_date,
		last_update,
		course_grade,
        total_students,
		published
	FROM
		CoursesInfo
	WHERE
		published = 1
	ORDER BY
		total_students, course_grade, last_update DESC
	LIMIT TOTAL_ROWS;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetMostRecentCourses $$

CREATE PROCEDURE GetMostRecentCourses (
	IN total_rows INT
)
BEGIN
	SELECT
		id_course,
		course_title,
		course_description,
		course_image,
		course_price,
		instructor_id,
		publication_date,
		last_update,
		course_grade,
        total_students,
		published
	FROM
		CoursesInfo
	WHERE
		published = 1
	ORDER BY
		publication_date, total_students, course_grade DESC
	LIMIT TOTAL_ROWS;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetCourseInfo $$

CREATE PROCEDURE GetCourseInfo (
	IN id_course INT
)
BEGIN
	SELECT
		id_course,
		course_title,
		course_description,
		course_image,
		course_price,
		instructor_id,
		publication_date,
		last_update,
		course_grade,
        total_students,
        published
	FROM
		CoursesInfo
	WHERE
		id_course = id_course;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetUserCourses $$

CREATE PROCEDURE GetCourses (
	IN id_user INT,
	IN only_published BIT
)
BEGIN
	IF only_published = 1 THEN
		SELECT
			id_course,
			course_title,
			course_description,
			course_image,
			course_price,
			instructor_id,
			publication_date,
			last_update,
            course_grade,
            published
		FROM
			CoursesInfo
		WHERE
			instructor_id = id_user AND published = 1;
    ELSE
		SELECT
			id_course,
			course_title,
			course_description,
			course_image,
			course_price,
			instructor_id,
			publication_date,
			last_update,
            course_grade,
            published
		FROM
			CoursesInfo
		WHERE
			instructor_id = id_user;
    END IF;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetUserEnrolledCourses $$

CREATE PROCEDURE GetUserEnrolledCourses (
	IN id_user INT
)
BEGIN
	SELECT 
		CI.id_course,
		CI.course_title,
		CI.course_description,
		CI.course_image,
		CI.course_price,
		CI.instructor_id,
		CI.publication_date,
		CI.last_update,
		CI.course_grade,
        CI.total_lessons,
		CI.published,
        UC.enroll_date,
        (SELECT
			COUNT(*)
		FROM
			Users_Lessons AS UL
            INNER JOIN CoursesLessons AS CL ON CL.id_lesson = UL.lesson_id
		WHERE
			CL.id_course = CI.id_course) AS completed_lessons
	FROM
		CoursesInfo AS CI
        INNER JOIN Users_Courses AS UC ON UC.course_id = CI.id_course
	WHERE
		UC.user_id = id_user;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS AddCategory $$

CREATE PROCEDURE AddCategory (
	IN id_course INT,
    IN id_category INT
)
BEGIN
	INSERT INTO Courses_Categories (
		course_id,
        category_id
    )
    VALUES (
		id_course,
        id_category
    );
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS DeleteCategory $$

CREATE PROCEDURE DeleteCategory (
	IN id_course INT,
    IN id_category INT
)
BEGIN
	DELETE FROM Courses_Categories
    WHERE
		id_course = id_course AND id_category = id_category;
END $$
DELIMITER ;