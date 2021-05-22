USE w2l_db_dev;

DELIMITER $$
DROP PROCEDURE IF EXISTS RegisterSale $$

CREATE PROCEDURE RegisterSale (
	IN id_product INT,
	IN id_customer INT,
    IN id_seller INT
)
BEGIN
	INSERT INTO Sales (
		customer_id,
        seller_id,
        product_id,
        sale_date
    )
    VALUES (
		id_customer,
        id_seller,
        id_product,
        CURRENT_TIMESTAMP()
    );
    
    SELECT LAST_INSERT_ID();
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetUserSales $$

CREATE PROCEDURE GetUserSales (
	IN id_user INT
)
BEGIN
	SELECT
		S.id_sale,
        S.product_id,
        P.product_name,
        P.product_price,
        S.sale_date
	FROM
		Sales AS S
        INNER JOIN Products AS P ON P.id_product = S.product_id
	WHERE
		S.seller_id = id_user;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetUserSalesResume $$

CREATE PROCEDURE GetUserSalesResume (
	IN id_user INT
)
BEGIN
	SELECT
        S.product_id,
        P.product_name,
        P.product_price,
        SUM(P.product_price) AS total_sales
	FROM
		Sales AS S
        INNER JOIN Products AS P ON P.id_product = S.product_id
	WHERE
		S.seller_id = id_user
	GROUP BY
		S.product_id, P.product_name, P.product_price;
END $$
DELIMITER ;