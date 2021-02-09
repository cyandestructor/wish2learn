USE w2l_db_dev;

CREATE VIEW CoursesInfo
AS
	SELECT
		id_course,
		course_title,
		course_description,
		course_image,
		course_price,
		instructor_id,
		publication_date,
		last_update,
		(SELECT AVG(grade) FROM Courses_Reviews) AS course_grade,
		published
	FROM
		Courses;