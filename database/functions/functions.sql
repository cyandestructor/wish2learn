USE w2l_db_dev;

DELIMITER $$
DROP FUNCTION IF EXISTS userLessonsCompleted $$

CREATE FUNCTION userLessonsCompleted(userId INT, courseId INT)
       RETURNS INT
       DETERMINISTIC
       READS SQL DATA
  BEGIN
	DECLARE total INT DEFAULT 0;
    
    SET total = (SELECT
					COUNT(*)
				FROM
					Users_Lessons AS UL
					INNER JOIN CoursesLessons AS CL ON CL.id_lesson = UL.lesson_id
				WHERE
					CL.id_course = courseId AND UL.user_id = userId AND UL.lesson_completed = 1);
                    
	RETURN total;
  END
$$
DELIMITER ;

-- From: https://stackoverflow.com/a/754159
DELIMITER $$
DROP FUNCTION IF EXISTS wordcount $$

CREATE FUNCTION wordcount(str LONGTEXT)
       RETURNS INT
       DETERMINISTIC
       SQL SECURITY INVOKER
       NO SQL
  BEGIN
    DECLARE wordCnt, idx, maxIdx INT DEFAULT 0;
    DECLARE currChar, prevChar BOOL DEFAULT 0;
    SET maxIdx=char_length(str);
    SET idx = 1;
    WHILE idx <= maxIdx DO
        SET currChar=SUBSTRING(str, idx, 1) RLIKE '[[:alnum:]]';
        IF NOT prevChar AND currChar THEN
            SET wordCnt=wordCnt+1;
        END IF;
        SET prevChar=currChar;
        SET idx=idx+1;
    END WHILE;
    RETURN wordCnt;
  END
$$
DELIMITER ;

DELIMITER $$
DROP FUNCTION IF EXISTS textduration $$

CREATE FUNCTION textduration(str LONGTEXT)
       RETURNS INT
       DETERMINISTIC
  BEGIN
	-- Avg words per page = 800
    -- Avg time to read one page = 3.2 min = 192 s
    -- seconds per word = 192s / 800 words = 0.24
    DECLARE secondsPerWord DECIMAL(5,2) DEFAULT 0.24;
    DECLARE wordCnt DECIMAL(5,2);
    
    SET wordCnt = wordcount(str);
    
    RETURN FLOOR(wordCnt * secondsPerWord);
  END
$$
DELIMITER ;