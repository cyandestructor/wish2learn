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
    user_role TINYINT DEFAULT 1,
    account_creation_date DATE,
    last_change_date DATETIME,
    account_state TINYINT DEFAULT 1,
    
    PRIMARY KEY (id_user),
    FULLTEXT (username, account_name, account_lastname)
);
/**/

alter table Users modify column id_user INT comment 'Codigo unico numerico que identifica a cada usuario';
alter table Users modify column username NVARCHAR(50) comment 'Alias de usuario, no es un nombre necesariamente';
alter table Users modify column account_name NVARCHAR(50) comment 'Nombre oficial del usuario que crea la cuenta';
alter table Users modify column account_lastname NVARCHAR(50) comment 'Nombre oficial del usuario que crea la cuenta';
alter table Users modify column user_description TEXT comment 'Palabras dichas por el usuario que definen su personalidad o aspectos importantes de su vida';
alter table Users modify column user_email NVARCHAR(60) comment 'Correo electronico del usuario que lo identifica, y sirve para enviarle notificaciones';
alter table Users modify column user_password VARCHAR(255) comment 'Combinacion de numeros, letras, y caracteres para proteger el acceso a su cuenta';
alter table Users modify column user_image MEDIUMBLOB comment 'El usuario puede subir una foto que lo identifique';
alter table Users modify column user_role TINYINT comment 'El usuario puede tener el rol de instructor, o de alumno';
alter table Users modify column account_creation_date DATE comment 'Dia que el usuario creo la cuenta';
alter table Users modify column last_change_date DATETIME comment 'Fecha de la ultima actualizacion realizada en la cuenta';
alter table Users modify column account_state TINYINT comment 'Estado actual de la cuenta, debido a que puede estar activa, o suspendida';

CREATE TABLE Products (
	id_product INT NOT NULL AUTO_INCREMENT,
    product_name NVARCHAR(70),
    product_price DECIMAL(15, 2),
    
    PRIMARY KEY (id_product)
);
alter table Products modify column id_product INT comment 'Codigo numerico que identifica a los productos';
alter table Products modify column product_name INT comment 'Un producto es una porcion de un curso, que puede ser adquirida por un estudiante';
alter table Products modify column product_price DECIMAL comment 'Precio en pesos mexicanos del producto';


CREATE TABLE Courses (
	id_course INT NOT NULL AUTO_INCREMENT,
    course_title NVARCHAR(70) NOT NULL,
    course_description TEXT,
    course_image MEDIUMBLOB,
    product_id INT NOT NULL,
    instructor_id INT NOT NULL,
    publication_date DATETIME,
    last_update DATETIME,
    published BIT DEFAULT 1,
    
    PRIMARY KEY (id_course),
    FOREIGN KEY (product_id) REFERENCES Products (id_product),
    FOREIGN KEY (instructor_id) REFERENCES Users (id_user) ON DELETE CASCADE,
    
    FULLTEXT (course_title)
);
alter table Courses modify column course_title NVARCHAR(70) comment 'Titulo que asigna un instructor para definir las caracteristicas y aprendizajes de un curso';
alter table Courses modify column  course_description TEXT comment 'Precio en pesos mexicanos del producto';
alter table Courses modify column  course_image MEDIUMBLOB comment 'Precio en pesos mexicanos del producto';
alter table Courses modify column  product_id INT comment 'Codigo numerico que identifica el numero del producto';
alter table Courses modify column  instructor_id INT comment 'Codigo numerico que identifica al creador del curso';
alter table Courses modify column  publication_date DATETIME comment 'Fecha de publicacion pública del curso';
alter table Courses modify column  last_update DATETIME comment 'Fecha en la que se actualizo la informacion del curso';
alter table Courses modify column  published BIT comment 'Estado del curso, por ejemplo publicado u oculto';
CREATE TABLE Categories (
	id_category INT NOT NULL AUTO_INCREMENT,
    category_name NVARCHAR(50) NOT NULL,
    category_description TEXT,
    
    PRIMARY KEY (id_category)
);
alter table Categories modify column category_name NVARCHAR(50) comment 'Nombre de la categoria';
alter table Categories modify column category_description TEXT comment 'Descripcion de la categoria';

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

alter table Sections modify column section_title NVARCHAR(50) comment 'Titulo de la sección';
alter table Sections modify column section_is_free BIT comment 'Estado del curso en cuanto si es de paga o gratuito';
alter table Sections modify column course_id INT comment 'Curso al que pertenece la seccion';
alter table Sections modify column product_id INT comment 'Codigo de producto asignado a la sección';
alter table Sections modify column published BIT comment 'Estado de publicacion de la seccion es decir si esta publicada o no';


CREATE TABLE Lessons (
	id_lesson INT NOT NULL AUTO_INCREMENT,
    lesson_title NVARCHAR(50) NOT NULL,
    content_type TINYINT,
    lesson_text MEDIUMTEXT,
    section_id INT NOT NULL,
    published BIT DEFAULT 1,
    
    PRIMARY KEY (id_lesson),
    FOREIGN KEY (section_id) REFERENCES Sections (id_section) ON DELETE CASCADE
);
alter table Lessons modify column lesson_title NVARCHAR(50) comment 'Titulo de la leccion';
alter table Lessons modify column content_type TINYINT comment 'Tipo de contenido'; /* **************************** PENDIENTE   ************************ */
alter table Lessons modify column lesson_text MEDIUMTEXT comment 'Texto de la lección que introduce el instructor';
alter table Lessons modify column section_id INT comment 'Codigo de la seccion a la que pertenece';
alter table Lessons modify column published BIT comment 'Estado de publicacion de la seccion es decir si esta publicada o no';

CREATE TABLE Resources (
	id_resource INT NOT NULL AUTO_INCREMENT,
    resource_content LONGBLOB,
    lesson_id INT NOT NULL,
    PRIMARY KEY (id_resource),
    FOREIGN KEY (lesson_id) REFERENCES Lessons (id_lesson) ON DELETE CASCADE
);
alter table Resources modify column resource_content BIT comment 'Contenido de los recursos, archivos necesarios para llevar a cabo las practicas';
alter table Resources modify column resource_content BIT comment 'Codigo para saber a que leccion pertenece el recurso';

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

alter table Comments modify column comment_body TEXT comment 'Contenido de un comentario que ha hecho un usuario';
alter table Comments modify column comment_upvotes INT comment 'Votos positivos de un comentario';
alter table Comments modify column comment_date DATETIME comment 'Fecha en que se realizo un comentario';
alter table Comments modify column comment_parent_id INT comment 'Indica si un comentario respondio a otro';
alter table Comments modify column published BIT comment 'Estado de un comentario, si esta publicado';
CREATE TABLE Videos (
	id_video INT NOT NULL AUTO_INCREMENT,
    video_address NVARCHAR(100),
    video_duration INT,
    lesson_id INT,
    
    PRIMARY KEY (id_video),
    FOREIGN KEY (lesson_id) REFERENCES Lessons (id_lesson)
);
alter table Videos modify column video_address NVARCHAR(100) comment 'Link de almacenamiento del video de un recurso para una lección';
alter table Videos modify column video_duration INT comment 'Duracion de un video';
alter table Videos modify column lesson_id INT comment 'Codigo de la leccion a la que pertenece el video';

CREATE TABLE Messages (
	id_message INT NOT NULL AUTO_INCREMENT,
    message_body MEDIUMTEXT,
    message_date DATETIME,
    
    PRIMARY KEY (id_message)
);
alter table Messages modify column message_body INT comment 'Contenido del mensaje enviado entre usuarios';
alter table Messages modify column message_date INT comment 'Fecha de envio de un mensaje';

CREATE TABLE Reviews (
	id_review INT NOT NULL AUTO_INCREMENT,
    review_body TEXT,
    review_date DATETIME,
    published BIT DEFAULT 1,
    
    PRIMARY KEY (id_review)
);
alter table Reviews modify column review_body INT comment 'Contenido del mensaje enviado entre usuarios'; /*  ************************ PENDIENTE ******************/
alter table Reviews modify column review_date INT comment 'Fecha de envio de un mensaje';
alter table Reviews modify column published INT comment 'Estado de la publicacion';
CREATE TABLE Certificates (
	id_certificate BINARY(16) NOT NULL,
    user_name NVARCHAR(150) NOT NULL,
    instructor_name NVARCHAR(150) NOT NULL,
    course_title NVARCHAR(70) NOT NULL,
    expedition_date DATE NOT NULL,
    
    PRIMARY KEY (id_certificate)
);
alter table Certificates modify column user_name NVARCHAR(150) comment 'Nombre de usuario que se va a expedir en el certificado';
alter table Certificates modify column instructor_name NVARCHAR(150) comment 'Nombre del instructor que impartio el curso';
alter table Certificates modify column course_title NVARCHAR(70) comment 'Titulo del curso que aprobo el usuario';
alter table Certificates modify column expedition_date DATE comment 'Fecha de expedicion del certificado';

CREATE TABLE Users_Courses (
	id_user_course INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    enroll_date DATE,
    PRIMARY KEY (id_user_course),
    FOREIGN KEY (user_id) REFERENCES Users (id_user) ON DELETE CASCADE,
	FOREIGN KEY (course_id) REFERENCES Courses (id_course) ON DELETE CASCADE
);
alter table Users_Courses modify column user_id INT comment 'Codigo del usuario';
alter table Users_Courses modify column course_id INT comment 'Codigo del curso que compra el usuario';
alter table Users_Courses modify column enroll_date DATE comment 'Fecha en que el usuario se inscribe al curso';
CREATE TABLE Courses_Categories (
	id_course_category INT NOT NULL AUTO_INCREMENT,
    course_id INT NOT NULL,
    category_id INT NOT NULL,
    
    PRIMARY KEY (id_course_category),
    FOREIGN KEY (category_id) REFERENCES Categories (id_category),
    FOREIGN KEY (course_id) REFERENCES Courses (id_course) ON DELETE CASCADE
);

alter table Courses_Categories modify column course_id INT comment 'Codigo del curso que pertenece a una categoria';
alter table Courses_Categories modify column category_id INT comment 'Codigo de la categoria';

CREATE TABLE Users_Sections (
	id_user_section INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    section_id INT NOT NULL,
    
    PRIMARY KEY (id_user_section),
    FOREIGN KEY (user_id) REFERENCES Users (id_user) ON DELETE CASCADE,
    FOREIGN KEY (section_id) REFERENCES Sections (id_section) ON DELETE CASCADE
);
alter table Users_Sections modify column user_id INT comment 'Codigo del usuario que adquirio una seccion de un curso';
alter table Users_Sections modify column section_id INT comment 'Sección que ha adquirido un usuario';

CREATE TABLE Users_Lessons (
	id_user_lesson INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    lesson_completed BIT DEFAULT 0,
    
    PRIMARY KEY (id_user_lesson),
    FOREIGN KEY (user_id) REFERENCES Users (id_user) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES Lessons (id_lesson) ON DELETE CASCADE
);
alter table Users_Lessons modify column user_id INT comment 'Codigo del usuario';
alter table Users_Lessons modify column lesson_id INT comment 'Codigo de Leccion';
alter table Users_Lessons modify column lesson_completed BIT comment 'Estado de una leccion, si esta completa o en revision por el estudiante, para evaluar su progreso';

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
alter table Users_Comments modify column user_id INT comment 'Codigo de usuario que realiza un comentario';
alter table Users_Comments modify column comment_id INT comment 'Codigo de comentario';
alter table Users_Comments modify column lesson_id INT comment 'Codigo de la lección donde se realiza el comentario';

CREATE TABLE Users_Messages (
	id_user_message INT NOT NULL AUTO_INCREMENT,
    user_sender_id INT NOT NULL,
    user_receptor_id INT NOT NULL,
    message_id INT NOT NULL,
    
    PRIMARY KEY (id_user_message),
    FOREIGN KEY (message_id) REFERENCES Messages (id_message),
    FOREIGN KEY (user_sender_id) REFERENCES Users (id_user) ON DELETE CASCADE,
    FOREIGN KEY (user_receptor_id) REFERENCES Users (id_user) ON DELETE CASCADE
);
alter table Users_Messages modify column user_sender_id INT comment 'Codigo del usuario que envío el mensaje';

alter table Users_Messages modify column user_receptor_id INT comment 'Codigo del usuario que recibe el mensaje';
alter table Users_Messages modify column message_id INT comment 'Codigo del mensaje de texto';
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
alter table Courses_Reviews modify column course_id INT comment 'Codigo del curso';
alter table Courses_Reviews modify column review_id INT comment ' del curso'; /************************** PENDIENTE *******************************/
alter table Courses_Reviews modify column user_id INT comment 'Codigo del usuario que califica el curso';
alter table Courses_Reviews modify column grade TINYINT comment 'Puntuación que califica del curso';
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

alter table Users_Certificates modify column user_id INT comment 'Codigo del estudiante que ha sido certificado';
alter table Users_Certificates modify column course_id INT comment 'Codigo del curso finalizado por el estudiante';
alter table Users_Certificates modify column certificate_id BINARY comment 'Codigo del certificado expedido';

CREATE TABLE Users_Upvotes (
	id_user_upvote INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    comment_id INT NOT NULL,
    
    PRIMARY KEY (id_user_upvote),
    FOREIGN KEY (user_id) REFERENCES Users (id_user) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES Comments (id_comment) ON DELETE CASCADE
);
alter table Users_Upvotes modify column user_id INT comment 'Codigo del usuario que vota positivo';
alter table Users_Upvotes modify column comment_id INT comment 'Codigo del comentario positivo';