USE w2l_db_dev;

DELIMITER $$
DROP PROCEDURE IF EXISTS CreateCourse $$

CREATE PROCEDURE CreateCourse (
    IN course_title NVARCHAR(70),
    IN course_description TEXT,
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
        product_id,
		instructor_id,
		publication_date,
		last_update
    )
    VALUES (
		course_title,
		course_description,
        product_id,
		instructor_id,
		CURRENT_TIMESTAMP(),
		CURRENT_TIMESTAMP()
    );
    
    SELECT LAST_INSERT_ID();
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
	UPDATE Courses AS C
    SET
		C.course_title = course_title,
		C.course_description = course_description
	WHERE
		C.id_course = id_course;
        
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
	IN course_image MEDIUMBLOB,
    IN content_type VARCHAR(50)
)
BEGIN
	UPDATE Courses AS C
    SET
		C.course_image = course_image,
        C.image_content_type = content_type
	WHERE
		C.id_course = id_course;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetCourseImage $$

CREATE PROCEDURE GetCourseImage (
	IN id_course INT
)
BEGIN
	SELECT
		C.course_image,
        C.image_content_type
	FROM
		Courses AS C
	WHERE
		C.id_course = id_course;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS DeleteCourse $$

CREATE PROCEDURE DeleteCourse (
	IN id_course INT
)
BEGIN
	DELETE FROM Courses AS C
    WHERE C.id_course = id_course;
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
			CI.id_course,
			CI.course_title,
			CI.course_description,
			CI.course_price,
			CI.instructor_id,
            CI.instructor_name,
            CI.course_grade,
            CI.published
		FROM
			CoursesInfo AS CI
		WHERE
			CI.published = 1;
    ELSE
		SELECT
			CI.id_course,
			CI.course_title,
			CI.course_description,
			CI.course_price,
			CI.instructor_id,
            CI.instructor_name,
            CI.course_grade,
            CI.published
		FROM
			CoursesInfo AS CI;
    END IF;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetTopRatedCourses $$

CREATE PROCEDURE GetTopRatedCourses (
	IN total_rows INT,
    IN row_offset INT
)
BEGIN
	SELECT
		CI.id_course,
		CI.course_title,
		CI.course_description,
		CI.course_price,
		CI.instructor_id,
		CI.instructor_name,
		CI.course_grade,
		CI.published
	FROM
		CoursesInfo AS CI
	WHERE
		CI.published = 1
	ORDER BY
		CI.course_grade DESC
	LIMIT
		total_rows
    OFFSET
		row_offset;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetTopSellsCourses $$

CREATE PROCEDURE GetTopSellsCourses (
	IN total_rows INT,
    IN row_offset INT
)
BEGIN
	SELECT
		CI.id_course,
		CI.course_title,
		CI.course_description,
		CI.course_price,
		CI.instructor_id,
		CI.instructor_name,
		CI.course_grade,
		CI.published
	FROM
		CoursesInfo AS CI
	WHERE
		CI.published = 1
	ORDER BY
		CI.total_students DESC
	LIMIT
		total_rows
	OFFSET
		row_offset;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetMostRecentCourses $$

CREATE PROCEDURE GetMostRecentCourses (
	IN total_rows INT,
    IN row_offset INT
)
BEGIN
	SELECT
		CI.id_course,
		CI.course_title,
		CI.course_description,
		CI.course_price,
		CI.instructor_id,
		CI.instructor_name,
		CI.course_grade,
		CI.published
	FROM
		CoursesInfo AS CI
	WHERE
		CI.published = 1
	ORDER BY
		CI.publication_date DESC
	LIMIT
		total_rows
	OFFSET
		row_offset;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetCourseInfo $$

CREATE PROCEDURE GetCourseInfo (
	IN id_course INT
)
BEGIN
	SELECT
		CI.id_course,
		CI.course_title,
		CI.course_description,
		CI.course_price,
		CI.instructor_id,
        CI.instructor_name,
		CI.publication_date,
		CI.last_update,
		CI.course_grade,
        CI.total_students,
        CI.total_lessons,
        CI.published
	FROM
		CoursesInfo AS CI
	WHERE
		CI.id_course = id_course;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetUserCourses $$

CREATE PROCEDURE GetUserCourses (
	IN id_user INT,
	IN only_published BIT
)
BEGIN
	IF only_published = 1 THEN
		SELECT
			CI.id_course,
			CI.course_title,
			CI.course_description,
			CI.course_price,
			CI.instructor_id,
            CI.instructor_name,
            CI.course_grade,
            CI.published
		FROM
			CoursesInfo AS CI
		WHERE
			CI.instructor_id = id_user AND CI.published = 1;
    ELSE
		SELECT
			CI.id_course,
			CI.course_title,
			CI.course_description,
			CI.course_price,
			CI.instructor_id,
            CI.instructor_name,
            CI.course_grade,
            CI.published
		FROM
			CoursesInfo AS CI
		WHERE
			CI.instructor_id = id_user;
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
		CI.course_price,
		CI.instructor_id,
		CI.instructor_name,
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
DROP PROCEDURE IF EXISTS SearchCourses $$

CREATE PROCEDURE SearchCourses (
	IN search_input TINYTEXT
)
BEGIN
	SELECT
		CI.id_course,
		CI.course_title,
		CI.course_description,
		CI.course_price,
		CI.instructor_id,
		CI.instructor_name,
		CI.course_grade,
		CI.published
	FROM
		(SELECT
			ids.course_id
		FROM	
			(SELECT
				CCI.course_id
			FROM
				CoursesCategoriesInfo AS CCI
			WHERE
				CCI.category_name = search_input
			UNION
			SELECT
				C.id_course
			FROM
				Courses AS C
				INNER JOIN Users AS U ON U.id_user = C.instructor_id
			WHERE
				MATCH(C.course_title, U.username, U.account_name, U.account_lastname)
                AGAINST(search_input IN NATURAL LANGUAGE MODE)) AS ids
		GROUP BY
			ids.course_id) AS results
		INNER JOIN CoursesInfo AS CI ON CI.id_course = results.course_id;
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
	DELETE FROM Courses_Categories AS CC
    WHERE
		CC.course_id = id_course AND CC.category_id = id_category;
END $$
DELIMITER ;