USE w2l_db_dev;

DELIMITER $$
DROP PROCEDURE IF EXISTS AddResource $$

CREATE PROCEDURE AddResource (
    IN resource_content LONGBLOB,
    IN content_type VARCHAR(50),
    IN lesson_id INT
)
BEGIN
	INSERT INTO Resources (
		resource_content,
        content_type,
		lesson_id
    )
    VALUES (
		resource_content,
		lesson_id
    );
    
    SELECT LAST_INSERT_ID();
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS DeleteResource $$

CREATE PROCEDURE DeleteResource (
	IN id_resource INT
)
BEGIN
	DELETE FROM Resources AS R
    WHERE
		R.id_resource = id_resource;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetLessonResources $$

CREATE PROCEDURE GetLessonResources (
	IN id_lesson INT
)
BEGIN
	SELECT
		R.id_resource,
        R.content_type
	FROM
		Resources AS R
	WHERE
		R.lesson_id = id_lesson;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetResource $$

CREATE PROCEDURE GetResource (
	IN resource_id INT
)
BEGIN
	SELECT
		R.id_resource,
        R.resource_content,
        R.content_type,
        R.lesson_id
	FROM
		Resources AS R
	WHERE
		R.id_resource = resource_id;
END $$
DELIMITER ;