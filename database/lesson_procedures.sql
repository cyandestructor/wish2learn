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
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS EditLesson $$

CREATE PROCEDURE EditLesson (
	IN id_lesson INT,
	IN lesson_title NVARCHAR(50),
    IN content_type TINYINT,
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
drop procedure if exists HideLesson $$

create procedure HideLesson (
	in id_lesson int,
    in hide bit
)
begin
	update Lessons
    set
		published = hide
    where
		id_lesson = id_lesson;
end $$
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
		published
	FROM
		Lessons
	WHERE
		section_id = id_section;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetLessonInfo $$

CREATE PROCEDURE GetLessonInfo (
	IN id_lesson INT
)
BEGIN
	SELECT
		L.id_lesson,
		L.lesson_title,
		L.content_type,
		L.lesson_text,
		L.published,
        V.video_address,
		coalesce(V.video_duration, 0) as lesson_duration -- TODO: CALCULATE DURATION DEPENDING OF THE WORDS
	FROM
		Lessons as L
        left join Videos as V on V.lesson_id = L.id_lesson
	WHERE
		L.id_lesson = id_lesson;
END $$
DELIMITER ;