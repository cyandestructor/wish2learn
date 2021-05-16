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
	DECLARE lesson_id INT;

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
    
    SET lesson_id = LAST_INSERT_ID();
    
    UPDATE
		Courses AS C
        INNER JOIN Sections AS S ON S.course_id = C.id_course
	SET
		C.last_update = CURRENT_TIMESTAMP()
	WHERE
		S.id_section = section_id;
        
	SELECT lesson_id;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS EditLesson $$

CREATE PROCEDURE EditLesson (
	IN id_lesson INT,
	IN lesson_title NVARCHAR(50),
    IN lesson_text MEDIUMTEXT,
    IN published BIT
)
BEGIN
	UPDATE Lessons AS L
    SET
		L.lesson_title = lesson_title,
		L.lesson_text = lesson_text,
        L.published = published
	WHERE
		L.id_lesson = id_lesson;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS DeleteLesson $$

CREATE PROCEDURE DeleteLesson (
	IN id_lesson INT
)
BEGIN
	DELETE FROM Lessons AS L
	WHERE L.id_lesson = id_lesson;
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
	IF EXISTS(
		SELECT
			UL.id_user_lesson
		FROM
			Users_Lessons AS UL
        WHERE
			UL.user_id = id_user AND UL.lesson_id = id_lesson
	) THEN
		UPDATE Users_Lessons AS UL
		SET
			UL.lesson_completed = completed
		WHERE
			UL.user_id = id_user AND UL.lesson_id = id_lesson;
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
		LI.id_lesson,
		LI.lesson_title,
		LI.published,
        LI.lesson_duration,
        LI.section_id
	FROM
		LessonsInfo AS LI
	WHERE
		LI.section_id = id_section;
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
		ULI.id_lesson,
		ULI.lesson_title,
		ULI.published,
        ULI.lesson_duration,
        ULI.id_section,
        ULI.lesson_completed
	FROM
		UsersLessonsInfo AS ULI
	WHERE
		ULI.id_section = id_section AND ULI.id_user = id_user;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetLessonInfo $$

CREATE PROCEDURE GetLessonInfo (
	IN id_lesson INT
)
BEGIN
	SELECT
		LI.id_lesson,
		LI.lesson_title,
		LI.content_type,
		LI.lesson_text,
		LI.published,
        LI.video_address,
		LI.lesson_duration,
        LI.section_id
	FROM
		LessonsInfo AS LI
	WHERE
		LI.id_lesson = id_lesson;
END $$
DELIMITER ;