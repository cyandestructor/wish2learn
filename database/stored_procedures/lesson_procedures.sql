USE w2l_db_dev;

DELIMITER $$
DROP PROCEDURE IF EXISTS AddLesson $$

CREATE PROCEDURE AddLesson (
	IN lesson_title NVARCHAR(50),
    IN content_type TINYINT,
    IN lesson_text MEDIUMTEXT,
    IN section_id INT
)
BEGIN
	INSERT INTO Lessons (
		lesson_title,
		content_type,
		lesson_text,
		section_id
    )
    VALUES (
		lesson_title,
		content_type,
		lesson_text,
		section_id
    );
    
    UPDATE
		Courses AS C
        INNER JOIN Sections AS S ON S.course_id = C.id_course
	SET
		C.last_update = CURRENT_TIMESTAMP()
	WHERE
		S.id_section = section_id;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS EditLesson $$

CREATE PROCEDURE EditLesson (
	IN id_lesson INT,
	IN lesson_title NVARCHAR(50),
    IN lesson_text MEDIUMTEXT
)
BEGIN
	UPDATE Lessons
    SET
		lesson_title = lesson_title,
		lesson_text = lesson_text
	WHERE
		id_lesson = id_lesson;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS DeleteLesson $$

CREATE PROCEDURE DeleteLesson (
	IN id_lesson INT
)
BEGIN
	DELETE FROM Lessons
	WHERE id_lesson = id_lesson;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS HideLesson $$

CREATE PROCEDURE HideLesson (
	IN id_lesson INT,
    IN hide BIT
)
BEGIN
	UPDATE Lessons
    SET
		published = hide
    WHERE
		id_lesson = id_lesson;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS SetLessonCompleted $$

CREATE PROCEDURE SetLessonCompleted (
	IN id_user INT,
    IN id_lesson INT,
    IN completed BIT
)
BEGIN
	IF EXISTS(SELECT id_user_lesson FROM Users_Lessons WHERE user_id = id_user AND lesson_id = id_lesson) THEN
		UPDATE Users_Lessons
		SET
			lesson_completed = completed
		WHERE
			user_id = id_user AND lesson_id = id_lesson;
	ELSE
		INSERT INTO Users_Lessons (
			user_id,
			lesson_id,
			lesson_completed
        )
        VALUES (
			id_user,
			id_lesson,
			completed
        );
	END IF;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetSectionLessons $$

CREATE PROCEDURE GetSectionLessons (
	IN id_section INT
)
BEGIN
	SELECT
		id_lesson,
		lesson_title,
		content_type,
		lesson_text,
		published,
        video_address,
        lesson_duration
	FROM
		LessonsInfo
	WHERE
		section_id = id_section AND published = 1;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetSectionUserLessons $$

CREATE PROCEDURE GetSectionUserLessons (
	IN id_user INT,
    IN id_section INT
)
BEGIN
	SELECT
		id_lesson,
		lesson_title,
		content_type,
		lesson_text,
		published,
        video_address,
        lesson_duration,
        lesson_completed
	FROM
		UsersLessonsInfo
	WHERE
		id_section = id_section AND id_user = id_user;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetLessonInfo $$

CREATE PROCEDURE GetLessonInfo (
	IN id_lesson INT
)
BEGIN
	SELECT
		id_lesson,
		lesson_title,
		content_type,
		lesson_text,
		published,
        video_address,
		lesson_duration
	FROM
		LessonsInfo
	WHERE
		id_lesson = id_lesson;
END $$
DELIMITER ;