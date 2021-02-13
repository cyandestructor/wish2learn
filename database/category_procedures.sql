USE w2l_db_dev;

DELIMITER $$
DROP PROCEDURE IF EXISTS CreateCategory $$

CREATE PROCEDURE CreateCategory (
	IN category_name NVARCHAR(50),
    IN category_description TEXT
)
BEGIN
	INSERT INTO Categories (
		category_name,
        category_description
    )
    VALUES (
		category_name,
        category_description
    );
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS DeleteCategory $$

CREATE PROCEDURE DeleteCategory (
	IN id_category INT
)
BEGIN
	DELETE FROM Categories
    WHERE id_category = id_category;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetCategories $$

CREATE PROCEDURE GetCategories()
BEGIN
	SELECT
		id_category,
		category_name,
		category_description
	FROM
		Categories;
END $$
DELIMITER ;