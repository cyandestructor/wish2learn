use w2l_db_dev;

DROP VIEW IF EXISTS CoursesCategoriesInfo;
CREATE VIEW CoursesCategoriesInfo
AS
	SELECT
		CC.course_id,
		C.id_category AS category_id,
		C.category_name,
		C.category_description
	FROM
		Categories AS C
        INNER JOIN Courses_Categories AS CC ON CC.category_id = C.id_category;