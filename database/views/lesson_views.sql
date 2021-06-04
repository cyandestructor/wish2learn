USE w2l_db_dev;

DROP VIEW IF EXISTS LessonsInfo;
CREATE VIEW LessonsInfo
AS
	SELECT
		L.id_lesson,
		L.lesson_title,
		L.content_type,
		L.lesson_text,
		L.published,
        V.video_address,
		COALESCE(V.video_duration, textduration(L.lesson_text)) AS lesson_duration,
        L.section_id
	FROM
		Lessons AS L
        LEFT JOIN Videos AS V ON V.lesson_id = L.id_lesson;
        
DROP VIEW IF EXISTS UsersLessonsInfo;
CREATE VIEW UsersLessonsInfo
AS
	SELECT
		UL.user_id AS id_user,
		LI.id_lesson,
		LI.lesson_title,
		LI.content_type,
		LI.lesson_text,
		LI.published,
        LI.video_address,
        LI.lesson_duration,
        LI.section_id AS id_section,
        COALESCE(UL.lesson_completed, 0) AS lesson_completed
	FROM
		LessonsInfo AS LI
        LEFT JOIN Users_Lessons AS UL ON UL.lesson_id = LI.id_lesson;
        
DROP VIEW IF EXISTS CoursesLessons;
CREATE VIEW CoursesLessons
AS
	SELECT
		C.id_course,
        S.id_section,
		L.id_lesson
	FROM
		Lessons AS L
        INNER JOIN Sections AS S ON S.id_section = L.section_id
        INNER JOIN Courses AS C ON C.id_course = S.course_id;