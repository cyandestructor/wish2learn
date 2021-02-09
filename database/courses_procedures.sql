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
	INSERT INTO Courses (
		course_title,
		course_description,
		course_image,
		course_price,
		instructor_id,
		publication_date,
		last_update
    )
    VALUES (
		course_title,
		course_description,
		course_image,
		course_price,
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
    IN course_image MEDIUMBLOB,
    IN course_price DECIMAL(15, 2)
)
BEGIN
	UPDATE Courses
    SET
		course_title = course_title,
		course_description = course_description,
		course_image = course_image,
		course_price = course_price
	WHERE
		id_course = id_course;
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
            published
		FROM
			CoursesInfo;
    END IF;
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