USE w2l_db_dev;

DROP VIEW IF EXISTS CoursesInfo;
CREATE VIEW CoursesInfo
AS
	SELECT
		C.id_course,
		C.course_title,
		C.course_description,
		C.course_image,
		P.product_price AS course_price,
		C.instructor_id,
        concat(U.account_name, ' ', U.account_lastname) as instructor_name,
		C.publication_date,
		C.last_update,
		(SELECT
			AVG(grade)
		FROM
			Courses_Reviews AS CR
        WHERE
			CR.course_id = C.id_course) AS course_grade,
		(SELECT
			COUNT(*)
		FROM
			Users_Courses AS UC
		WHERE
			UC.course_id = C.id_course) AS total_students,
		(SELECT
			COUNT(*)
		FROM
			CoursesLessons AS CL
		WHERE
			CL.id_course = C.id_course) AS total_lessons,
		C.published
	FROM
		Courses AS C
        INNER JOIN Products AS P ON P.id_product = C.product_id
        INNER JOIN Users AS U ON U.id_user = C.instructor_id;