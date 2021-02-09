USE w2l_db_dev;

DELIMITER $$
DROP PROCEDURE IF EXISTS AddSection $$

CREATE PROCEDURE AddSection (
	IN section_title NVARCHAR(50),
    IN course_id INT,
    IN section_price DECIMAL(15, 2)
)
BEGIN
	INSERT INTO Sections (
		section_title,
		course_id,
		section_price
    )
    VALUES (
		section_title,
		course_id,
		section_price
    );
    
    UPDATE Courses
    SET
		last_update = CURRENT_TIMESTAMP()
	WHERE
		id_course = id_course;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS EditSection $$

CREATE PROCEDURE EditSection (
	IN id_section INT,
	IN section_title NVARCHAR(50),
    IN course_id INT,
    IN section_price DECIMAL(15, 2)
)
BEGIN
	UPDATE Sections
    SET
		section_title = section_title,
		course_id = course_id,
		section_price = section_price
	WHERE
		id_section = id_section;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS HideSection $$

CREATE PROCEDURE HideSection (
	IN id_section INT,
    IN hide BIT
)
BEGIN
	UPDATE Sections
    SET
		published = hide
	WHERE
		id_section = id_section;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS SetSectionFree $$

CREATE PROCEDURE SetSectionFree (
	IN id_section INT,
    IN is_free BIT
)
BEGIN
	UPDATE Sections
    SET
		section_is_free = is_free
	WHERE
		id_section = id_section;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS DeleteSection $$

CREATE PROCEDURE DeleteSection (
	IN id_section INT
)
BEGIN
	DELETE FROM Sections
    WHERE
		id_section = id_section;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetCourseSections $$

CREATE PROCEDURE GetCourseSections (
	IN id_course INT
)
BEGIN
	SELECT
		id_section,
		section_title,
		section_is_free,
		section_price,
		published
	FROM
		Sections
	WHERE
		course_id = id_course;
END $$
DELIMITER ;