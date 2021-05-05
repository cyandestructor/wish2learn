USE w2l_db_dev;

DELIMITER $$
DROP PROCEDURE IF EXISTS CreateCategory $$

CREATE PROCEDURE CreateCategory (
	IN category_name NVARCHAR(50),
    IN category_description TEXT
)
BEGIN
	INSERT INTO Categories (
		category_name,
        category_description
    )
    VALUES (
		category_name,
        category_description
    );
    
    SELECT last_insert_id();
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS EditCategory $$

CREATE PROCEDURE EditCategory (
	IN id_category INT,
	IN category_name NVARCHAR(50),
    IN category_description TEXT
)
BEGIN
	UPDATE Categories AS C
	SET
		C.category_name = category_name,
        C.category_description = category_description
	WHERE
		C.id_category = id_category;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS DeleteCategory $$

CREATE PROCEDURE DeleteCategory (
	IN id_category INT
)
BEGIN
	DELETE FROM Categories AS C
    WHERE C.id_category = id_category;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetCategory $$

CREATE PROCEDURE GetCategory(
	IN id_category INT
)
BEGIN
	SELECT
		C.id_category,
		C.category_name,
		C.category_description
	FROM
		Categories AS C
	WHERE
		C.id_category = id_category;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetCategories $$

CREATE PROCEDURE GetCategories(
	IN total_rows INT,
    IN row_offset INT
)
BEGIN
	SELECT
		id_category,
		category_name,
		category_description
	FROM
		Categories AS C
	LIMIT
		total_rows
	OFFSET
		row_offset;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetCourseCategories $$

CREATE PROCEDURE GetCourseCategories (
	IN id_course INT
)
BEGIN
    SELECT
		CCI.category_id,
		CCI.category_name,
		CCI.category_description
	FROM
		CoursesCategoriesInfo AS CCI
	WHERE
		CCI.course_id = id_course;
END $$
DELIMITER ;