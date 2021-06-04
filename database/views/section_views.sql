USE w2l_db_dev;

DROP VIEW IF EXISTS SectionsInfo;
CREATE VIEW SectionsInfo
AS
	SELECT
		S.id_section,
		S.section_title,
        S.course_id,
		S.section_is_free,
        S.product_id,
		P.product_price AS section_price,
		S.published
	FROM
		Sections AS S
        LEFT JOIN Products AS P ON P.id_product = S.product_id;