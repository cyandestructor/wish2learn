USE w2l_db_dev;

DROP VIEW IF EXISTS CoursesUsers;
CREATE VIEW CoursesUsers
AS
	SELECT
		UC.course_id,
        UC.user_id,
		U.username,
		U.account_name,
		U.account_lastname,
		U.user_image
	FROM
		Users_Courses AS UC
        INNER JOIN Users AS U ON U.id_user = UC.user_id;