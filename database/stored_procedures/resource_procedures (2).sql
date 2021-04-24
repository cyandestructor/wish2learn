USE w2l_db_dev;

DELIMITER $$
DROP PROCEDURE IF EXISTS AddResource $$

CREATE PROCEDURE AddResource (
    IN resource_content LONGBLOB,
    IN lesson_id INT
)
BEGIN
	INSERT INTO Resources (
		resource_content,
		lesson_id
    )
    VALUES (
		resource_content,
		lesson_id
    );
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS DeleteResource $$

CREATE PROCEDURE DeleteResource (
	IN id_resource INT
)
BEGIN
	DELETE FROM Resources
    WHERE
		id_resource = id_resource;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetLessonResources $$

CREATE PROCEDURE GetLessonResources (
	IN id_lesson INT
)
BEGIN
	SELECT
		id_resource,
		resource_content
	FROM
		Resources
	WHERE
		lesson_id = id_lesson;
END $$
DELIMITER ;