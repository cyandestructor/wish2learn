USE w2l_db_dev;

DELIMITER $$
DROP PROCEDURE IF EXISTS AddVideo $$

CREATE PROCEDURE AddVideo (
	IN video_address NVARCHAR(100),
    IN video_duration INT,
    IN id_lesson INT
)
BEGIN
	DELETE FROM
		Videos
    WHERE
		lesson_id = id_lesson;

	INSERT INTO Videos (
		video_address,
        video_duration,
        lesson_id
    )
    VALUES (
		video_address,
        video_duration,
        id_lesson
    );
    
    SELECT LAST_INSERT_ID();
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS EditVideo $$

CREATE PROCEDURE EditVideo (
	IN video_id INT,
	IN video_address NVARCHAR(100),
    IN video_duration INT
)
BEGIN
	UPDATE Videos AS V
    SET
		V.video_address = video_address,
        V.video_duration = video_duration
	WHERE
		V.id_video = video_id;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS DeleteVideo $$

CREATE PROCEDURE DeleteVideo (
	IN video_id INT
)
BEGIN
	DELETE FROM Videos
    WHERE
		id_video = video_id;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetVideo $$

CREATE PROCEDURE GetVideo (
	IN video_id INT
)
BEGIN
	SELECT
		V.id_video,
        V.video_address,
        V.video_duration,
        V.lesson_id
	FROM
		Videos as V
	WHERE
		V.id_video = video_id;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetLessonVideo $$

CREATE PROCEDURE GetLessonVideo (
	IN lesson_id INT
)
BEGIN
	SELECT
		V.id_video,
        V.video_address,
        V.video_duration,
        V.lesson_id
	FROM
		Videos as V
	WHERE
		V.lesson_id = lesson_id;
END $$
DELIMITER ;