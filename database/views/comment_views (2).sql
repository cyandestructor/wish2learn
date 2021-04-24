USE w2l_db_dev;

DROP VIEW IF EXISTS CommentsInfo;
CREATE VIEW CommentsInfo
AS
	SELECT
		UC.user_id,
        U.username,
        C.id_comment,
		C.comment_body,
		C.comment_upvotes,
		C.comment_date,
		C.comment_parent_id,
		C.published,
        UC.lesson_id
	FROM
		Comments AS C
        INNER JOIN Users_Comments AS UC ON UC.comment_id = C.id_comment
        INNER JOIN Users AS U ON U.id_user = UC.user_id;