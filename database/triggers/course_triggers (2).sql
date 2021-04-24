USE w2l_db_dev;

DELIMITER $$
DROP TRIGGER IF EXISTS TR_AFTER_UPDATE_ON_COURSES $$

CREATE TRIGGER TR_AFTER_UPDATE_ON_COURSES
AFTER UPDATE
ON Courses FOR EACH ROW
BEGIN
	UPDATE
		Certificates AS C
		INNER JOIN Users_Certificates AS UC ON UC.certificate_id = C.id_certificate
	SET
		C.course_title = new.course_title
	WHERE
		UC.course_id = new.id_course;
END $$
DELIMITER ;