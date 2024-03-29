CREATE DATABASE w2l_db_dev;
USE w2l_db_dev;

CREATE TABLE Users (
	id_user INT NOT NULL AUTO_INCREMENT,
    username NVARCHAR(50) NOT NULL UNIQUE,
    account_name NVARCHAR(50) NOT NULL,
    account_lastname NVARCHAR(50) NOT NULL,
    user_description TEXT,
    user_email NVARCHAR(60) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_image MEDIUMBLOB,
    image_content_type VARCHAR(50),
    user_role TINYINT DEFAULT 1,
    account_creation_date DATE,
    last_change_date DATETIME,
    account_state TINYINT DEFAULT 1,
    
    PRIMARY KEY (id_user),
    FULLTEXT (username, account_name, account_lastname)
);

CREATE TABLE Products (
	id_product INT NOT NULL AUTO_INCREMENT,
    product_name NVARCHAR(70),
    product_price DECIMAL(15, 2),
    
    PRIMARY KEY (id_product)
);

CREATE TABLE Courses (
	id_course INT NOT NULL AUTO_INCREMENT,
    course_title NVARCHAR(70) NOT NULL,
    course_description TEXT,
    course_image MEDIUMBLOB,
    image_content_type VARCHAR(50),
    product_id INT NOT NULL,
    instructor_id INT NOT NULL,
    publication_date DATETIME,
    last_update DATETIME,
    published BIT DEFAULT 0,
    
    PRIMARY KEY (id_course),
    FOREIGN KEY (product_id) REFERENCES Products (id_product),
    FOREIGN KEY (instructor_id) REFERENCES Users (id_user) ON DELETE CASCADE,
    
    FULLTEXT (course_title)
);

CREATE TABLE Categories (
	id_category INT NOT NULL AUTO_INCREMENT,
    category_name NVARCHAR(50) NOT NULL,
    category_description TEXT,
    
    PRIMARY KEY (id_category)
);

CREATE TABLE Sections (
	id_section INT NOT NULL AUTO_INCREMENT,
    section_title NVARCHAR(50) NOT NULL,
    section_is_free BIT DEFAULT 0,
    course_id INT NOT NULL,
    product_id INT,
    published BIT DEFAULT 1,
    
    PRIMARY KEY (id_section),
	FOREIGN KEY (product_id) REFERENCES Products (id_product),
    FOREIGN KEY (course_id) REFERENCES Courses (id_course) ON DELETE CASCADE
);

CREATE TABLE Lessons (
	id_lesson INT NOT NULL AUTO_INCREMENT,
    lesson_title NVARCHAR(50) NOT NULL,
    content_type TINYINT, -- 1: video, 2: text and resources
    lesson_text MEDIUMTEXT,
    section_id INT NOT NULL,
    published BIT DEFAULT 1,
    
    PRIMARY KEY (id_lesson),
    FOREIGN KEY (section_id) REFERENCES Sections (id_section) ON DELETE CASCADE
);

CREATE TABLE Resources (
	id_resource INT NOT NULL AUTO_INCREMENT,
    resource_content LONGBLOB,
    content_type VARCHAR(255),
    lesson_id INT NOT NULL,
    
    PRIMARY KEY (id_resource),
    FOREIGN KEY (lesson_id) REFERENCES Lessons (id_lesson) ON DELETE CASCADE
);

CREATE TABLE Comments (
	id_comment INT NOT NULL AUTO_INCREMENT,
    comment_body TEXT,
    comment_upvotes INT DEFAULT 0,
    comment_date DATETIME,
    comment_parent_id INT,
    published BIT DEFAULT 1,
    
    PRIMARY KEY (id_comment),
    FOREIGN KEY (comment_parent_id) REFERENCES Comments (id_comment)
);

CREATE TABLE Videos (
	id_video INT NOT NULL AUTO_INCREMENT,
    video_address NVARCHAR(100),
    video_duration INT,
    lesson_id INT,
    
    PRIMARY KEY (id_video),
    FOREIGN KEY (lesson_id) REFERENCES Lessons (id_lesson)
);

CREATE TABLE Chats (
	id_chat INT NOT NULL AUTO_INCREMENT,
    chat_name NVARCHAR(80),
    
    PRIMARY KEY(id_chat)
);

CREATE TABLE Messages (
	id_message INT NOT NULL AUTO_INCREMENT,
    message_body MEDIUMTEXT,
    message_date DATETIME,
    
	user_sender_id INT,
    chat_id INT NOT NULL,
	
    PRIMARY KEY (id_message),
    FOREIGN KEY (user_sender_id) REFERENCES Users (id_user) ON DELETE SET NULL,
    FOREIGN KEY (chat_id) REFERENCES Chats (id_chat) ON DELETE CASCADE
);

CREATE TABLE Reviews (
	id_review INT NOT NULL AUTO_INCREMENT,
    review_body TEXT,
    review_date DATETIME,
    published BIT DEFAULT 1,
    
    PRIMARY KEY (id_review)
);

CREATE TABLE Certificates (
	id_certificate BINARY(16) NOT NULL,
    user_name NVARCHAR(150) NOT NULL,
    instructor_name NVARCHAR(150) NOT NULL,
    course_title NVARCHAR(70) NOT NULL,
    expedition_date DATE NOT NULL,
    
    PRIMARY KEY (id_certificate)
);

CREATE TABLE Users_Courses (
	id_user_course INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    enroll_date DATE,
    
    PRIMARY KEY (id_user_course),
    FOREIGN KEY (user_id) REFERENCES Users (id_user) ON DELETE CASCADE,
	FOREIGN KEY (course_id) REFERENCES Courses (id_course) ON DELETE CASCADE
);

CREATE TABLE Courses_Categories (
	id_course_category INT NOT NULL AUTO_INCREMENT,
    course_id INT NOT NULL,
    category_id INT NOT NULL,
    
    PRIMARY KEY (id_course_category),
    FOREIGN KEY (category_id) REFERENCES Categories (id_category),
    FOREIGN KEY (course_id) REFERENCES Courses (id_course) ON DELETE CASCADE
);

CREATE TABLE Users_Sections (
	id_user_section INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    section_id INT NOT NULL,
    
    PRIMARY KEY (id_user_section),
    FOREIGN KEY (user_id) REFERENCES Users (id_user) ON DELETE CASCADE,
    FOREIGN KEY (section_id) REFERENCES Sections (id_section) ON DELETE CASCADE
);

CREATE TABLE Users_Lessons (
	id_user_lesson INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    lesson_completed BIT DEFAULT 0,
    
    PRIMARY KEY (id_user_lesson),
    FOREIGN KEY (user_id) REFERENCES Users (id_user) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES Lessons (id_lesson) ON DELETE CASCADE
);

CREATE TABLE Users_Comments (
	id_user_comment INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    comment_id INT NOT NULL,
    lesson_id INT NOT NULL,
    
    PRIMARY KEY (id_user_comment),
    FOREIGN KEY (comment_id) REFERENCES Comments (id_comment),
    FOREIGN KEY (user_id) REFERENCES Users (id_user) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES Lessons (id_lesson) ON DELETE CASCADE
);

CREATE TABLE Users_Chats (
	id_user_chat INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    chat_id INT NOT NULL,
    
    PRIMARY KEY (id_user_chat),
    FOREIGN KEY (user_id) REFERENCES Users (id_user),
    FOREIGN KEY (chat_id) REFERENCES Chats (id_chat)
);

CREATE TABLE Courses_Reviews (
	id_course_review INT NOT NULL AUTO_INCREMENT,
    course_id INT NOT NULL,
    review_id INT NOT NULL,
    user_id INT NOT NULL,
    grade TINYINT,
    
    PRIMARY KEY (id_course_review),
    FOREIGN KEY (review_id) REFERENCES Reviews (id_review),
    FOREIGN KEY (course_id) REFERENCES Courses (id_course) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users (id_user) ON DELETE CASCADE
);

CREATE TABLE Users_Certificates (
	id_user_certificate INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    certificate_id BINARY(16),
    
    PRIMARY KEY (id_user_certificate),
    FOREIGN KEY (certificate_id) REFERENCES Certificates (id_certificate),
    FOREIGN KEY (user_id) REFERENCES Users (id_user) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Courses (id_course) ON DELETE CASCADE
);

CREATE TABLE Users_Upvotes (
	id_user_upvote INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    comment_id INT NOT NULL,
    
    PRIMARY KEY (id_user_upvote),
    FOREIGN KEY (user_id) REFERENCES Users (id_user) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES Comments (id_comment) ON DELETE CASCADE
);

CREATE TABLE Sales (
	id_sale INT NOT NULL AUTO_INCREMENT,
    seller_id INT NOT NULL,
    customer_id INT,
    product_id INT NOT NULL,
    sale_date DATETIME,
    
    PRIMARY KEY (id_sale),
    FOREIGN KEY (customer_id) REFERENCES Users (id_user) ON DELETE SET NULL,
    FOREIGN KEY (seller_id) REFERENCES Users (id_user) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products (id_product) ON DELETE CASCADE
);