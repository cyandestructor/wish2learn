USE w2l_db_dev;

DELIMITER $$
DROP PROCEDURE IF EXISTS AddSection $$

CREATE PROCEDURE AddSection (
	IN section_title NVARCHAR(50),
    IN course_id INT,
    IN section_price DECIMAL(15, 2)
)
BEGIN
	DECLARE product_id INT;
    
    IF section_price IS NULL OR section_price <= 0 THEN
		INSERT INTO Products (
			product_name,
            product_price
        )
        VALUES (
			CONCAT('Course #', course_id, ' Section: ', section_title),
            section_price
        );
        
        SET product_id = LAST_INSERT_ID();
	ELSE
		SET product_id = NULL;
	END IF;
    
    INSERT INTO Sections (
		section_title,
		course_id,
		product_id
    )
    VALUES (
		section_title,
		course_id,
		product_id
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
        
	UPDATE
		Products AS P
        INNER JOIN Sections AS S ON S.product_id = P.id_product
	SET
		P.product_title = CONCAT('Course #', course_id, ' Section: ', section_title),
        P.product_price = section_price
	WHERE
		S.id_section = id_section;
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
		SectionsInfo
	WHERE
		course_id = id_course;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetUserCourseSections $$

CREATE PROCEDURE GetUserCourseSections (
	IN id_course INT,
    IN id_user INT
)
BEGIN
	SELECT
		SI.id_section,
		SI.section_title,
		SI.section_is_free,
		SI.section_price,
		SI.published,
        EXISTS(
			SELECT
				US.id_user_section
			FROM
				Users_Sections AS US
			WHERE
				US.section_id = SI.id_section AND US.user_id = id_user) AS user_access
	FROM
		SectionsInfo AS SI
	WHERE
		SI.course_id = id_course;
END $$
DELIMITER ;