SELECT
	t.table_name,
    c.column_name,
    c.column_type,
    c.column_default,
    c.column_key,
    c.is_nullable,
    c.column_comment
FROM information_schema.tables AS t
INNER JOIN information_schema.columns AS c
	ON t.table_name = c.table_name
    AND t.table_type IN ('BASE TABLE')
    AND t.table_schema = 'w2l_db_dev'
    ORDER BY t.table_name,
    c.column_name,
    c.ordinal_position;