USE w2l_db_dev;

DELIMITER $$
DROP TRIGGER IF EXISTS TR_AFTER_UPDATE_ON_USERS $$

CREATE TRIGGER TR_AFTER_UPDATE_ON_USERS
AFTER UPDATE
ON Users FOR EACH ROW
BEGIN
	IF new.user_role = 1 THEN
		-- User
        UPDATE
			Certificates AS C
			INNER JOIN Users_Certificates AS UC ON UC.certificate_id = C.id_certificate
		SET
			C.user_name = CONCAT(new.account_name, ' ', new.account_lastname)
		WHERE
			UC.user_id = new.id_user;
	ELSEIF new.user_role = 2 THEN
		-- Instructor
        UPDATE
			Certificates AS C
			INNER JOIN Users_Certificates AS UC ON UC.certificate_id = C.id_certificate
            INNER JOIN Courses AS CO ON CO.id_course = UC.course_id
		SET
			C.instructor_name = CONCAT(new.account_name, ' ', new.account_lastname)
		WHERE
			CO.instructor_id = new.id_user;
	END IF;
END $$
DELIMITER ;

DELIMITER $$
DROP TRIGGER IF EXISTS TR_AFTER_INSERT_ON_USERS_COURSES $$

CREATE TRIGGER TR_AFTER_INSERT_ON_USERS_COURSES
AFTER INSERT
ON Users_Courses FOR EACH ROW
BEGIN
	INSERT INTO Users_Sections (
		user_id,
        section_id
    )
    SELECT
		new.user_id,
        S.id_section
	FROM
		Sections AS S
	WHERE
		S.course_id = new.course_id;
END $$
DELIMITER ;