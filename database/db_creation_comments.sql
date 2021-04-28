create database w2l_db_dev;
use w2l_db_dev;

create table Users (
	id_user int not null auto_increment,
    username nvarchar(50) not null unique,
    account_name nvarchar(50) not null,
    account_lastname nvarchar(50) not null,
    user_description text,
    user_email nvarchar(60) not null unique,
    user_password varchar(255) not null,
    user_image mediumblob,
    image_content_type varchar(50),
    user_role tinyint default 1,
    account_creation_date date,
    last_change_date datetime,
    account_state tinyint default 1,
    
    primary key (id_user),
    fulltext (username, account_name, account_lastname)
);

alter table Users modify column id_user int comment 'Codigo unico numerico que identifica a cada usuario';
alter table Users modify column username nvarchar(50) comment 'Alias de usuario, no es un nombre necesariamente';
alter table Users modify column account_name nvarchar(50) comment 'Nombre oficial del usuario que crea la cuenta';
alter table Users modify column account_lastname nvarchar(50) comment 'Nombre oficial del usuario que crea la cuenta';
alter table Users modify column user_description text comment 'Palabras dichas por el usuario que definen su personalidad o aspectos importantes de su vida';
alter table Users modify column user_email nvarchar(60) comment 'Correo electronico del usuario que lo identifica, y sirve para enviarle notificaciones';
alter table Users modify column user_password varchar(255) comment 'Combinacion de numeros, letras, y caracteres para proteger el acceso a su cuenta';
alter table Users modify column user_image mediumblob comment 'El usuario puede subir una foto que lo identifique';
alter table Users modify column user_role tinyint comment 'El usuario puede tener el rol de instructor, o de alumno';
alter table Users modify column account_creation_date date comment 'Dia que el usuario creo la cuenta';
alter table Users modify column last_change_date datetime comment 'Fecha de la ultima actualizacion realizada en la cuenta';
alter table Users modify column account_state tinyint comment 'Estado actual de la cuenta, debido a que puede estar activa, o suspendida';

create table Products (
	id_product int not null auto_increment,
    product_name nvarchar(70),
    product_price decimal(15, 2),
    
    primary key (id_product)
);
alter table Products modify column id_product int comment 'Codigo numerico que identifica a los productos';
alter table Products modify column product_name nvarchar(70) comment 'Un producto es una porcion de un curso, que puede ser adquirida por un estudiante';
alter table Products modify column product_price decimal(15, 2) comment 'Precio en pesos mexicanos del producto';


create table Courses (
	id_course int not null auto_increment,
    course_title nvarchar(70) not null,
    course_description text,
    course_image mediumblob,
    product_id int not null,
    instructor_id int not null,
    publication_date datetime,
    last_update datetime,
    published bit default 1,
    
    primary key (id_course),
    foreign key (product_id) references Products (id_product),
    foreign key (instructor_id) references Users (id_user) on delete cascade,
    
    fulltext (course_title)
);
alter table Courses modify column course_title nvarchar(70) comment 'Titulo que asigna un instructor para definir las caracteristicas y aprendizajes de un curso';
alter table Courses modify column  course_description text comment 'Descripcion que proporciona un instructor acerca del curso';
alter table Courses modify column  course_image mediumblob comment 'Imagen que describe en forma general el contenido del curso';
alter table Courses modify column  product_id int comment 'Codigo numerico que identifica el numero del producto';
alter table Courses modify column  instructor_id int comment 'Codigo numerico que identifica al creador del curso';
alter table Courses modify column  publication_date datetime comment 'Fecha de publicacion pública del curso';
alter table Courses modify column  last_update Datetime comment 'Fecha en la que se actualizo la informacion del curso';
alter table Courses modify column  published Bit comment 'Estado del curso, por ejemplo publicado u oculto';
Create Table Categories (
	id_category Int Not Null Auto_increment,
    category_name Nvarchar(50) Not Null,
    category_description Text,
    
    Primary Key (id_category)
);
alter table Categories modify column category_name Nvarchar(50) comment 'Nombre de la categoria';
alter table Categories modify column category_description Text comment 'Descripcion de la categoria';

Create Table Sections (
	id_section Int Not Null Auto_increment,
    section_title Nvarchar(50) Not Null,
    section_is_free Bit Default 0,
    course_id Int Not Null,
    product_id Int,
    published Bit Default 1,
    
    Primary Key (id_section),
	Foreign Key (product_id) References Products (id_product),
    Foreign Key (course_id) References Courses (id_course) On Delete Cascade
);

alter table Sections modify column section_title Nvarchar(50) comment 'Titulo de la sección';
alter table sections modify column section_is_free BIt comment 'Estado del curso en cuanto si es de paga o gratuito';
alter table sections modify column course_id INt comment 'Curso al que pertenece la seccion';
alter table sections modify column product_id INt comment 'Codigo de producto asignado a la sección';
alter table sections modify column published BIT comment 'estado de publicacion de la seccion es decir si esta publicada o no';


CREate taBle lessons (
	id_lesson INT noT nuLl auTo_increment,
    lesson_title NVArchar(50) noT nuLl,
    content_type TINyint,
    lesson_text MEDiumtext,
    section_id INT noT nuLl,
    published BIT deFault 1,
    
    PRImary keY (id_lesson),
    FOReign keY (section_id) ReFerences sections (id_section) On deLete caScade
);
alter table lessons modify column lesson_title NVArchar(50) comment 'titulo de la leccion';
alter table lessons modify column content_type TINyint comment 'tipo de contenido, por ejemplo pdf, texto, entre otros formatos'; /* **************************** PENDIENTE   ************************ */
alter table lessons modify column lesson_text MEDiumtext comment 'texto de la lección que introduce el instructor';
alter table lessons modify column section_id INT comment 'codigo de la seccion a la que pertenece';
alter table lessons modify column published BIT comment 'estado de publicacion de la leccion es decir si esta publicada o no';

CREAte tabLe resources (
	id_resource INT not nulL autO_increment,
    resource_content LONGblob,
    content_type varchar(50),
    lesson_id INT not nulL,
    PRIMary key (id_resource),
    FOREign key (lesson_id) REfErences lessons (id_lesson) ON DelEte casCade
);
alter table resources modify column resource_content LONGblob comment 'contenido de los recursos, archivos necesarios para cumplir con el aprendizaje esperado';
alter table resources modify column lesson_id INT comment 'codigo para saber a que leccion pertenece el recurso';

CREAte tabLe comments (
	id_comment INT not nulL autO_increment,
    comment_body TEXT,
    comment_upvotes INT defAult 0,
    comment_date DATEtime,
    comment_parent_id INT,
    published BIT defAult 1,
    
    PRIMary key (id_comment),
    FOREign key (comment_parent_id) REfErences comments (id_comment)
);

alter table comments modify column comment_body TEXT comment 'contenido de un comentario que ha hecho un usuario';
alter table comments modify column comment_upvotes INT comment 'votos positivos de un comentario';
alter table comments modify column comment_date DATEtime comment 'fecha en que se realizo un comentario';
alter table comments modify column comment_parent_id INT comment 'indica si un comentario respondio a otro';
alter table comments modify column published BIT comment 'estado de un comentario, si esta publicado';
CREAte tabLe videos (
	id_video INT not nulL autO_increment,
    video_address NVARchar(100),
    video_duration INT,
    lesson_id INT,
    
    PRIMary key (id_video),
    FOREign key (lesson_id) REfErences lessons (id_lesson)
);
alter table videos modify column video_address NVARchar(100) comment 'link de almacenamiento del video de un recurso para una lección';
alter table videos modify column video_duration INT comment 'duracion de un video';
alter table videos modify column lesson_id INT comment 'codigo de la leccion a la que pertenece el video';

CREATe tablE messages (
	id_message INT Not Null auto_increment,
    message_body MEDIUmtext,
    message_date DATETime,
    
    PRIMAry key (id_message)
);
alter table messages modify column message_body INT comment 'contenido del mensaje enviado entre usuarios';
alter table messages modify column message_date INT comment 'fecha de envio de un mensaje';

CREATe tablE reviews (
	id_review INT Not Null auto_increment,
    review_body TEXT,
    review_date DATETime,
    published BIT DefaUlt 1,
    
    PRIMAry key (id_review)
);
alter table reviews modify column review_body TEXT comment 'contenido de los comentarios con valoraciones que ponen los usuarios a un curso'; /*  ************************ PENDIENTE ******************/
alter table reviews modify column review_date DATETime comment 'fecha de envio comentario con valoracion';
alter table reviews modify column published BIT comment 'estado de la publicacion, publicado u oculto';

CREATe tablE certificates (
	id_certificate BINARy(16) not Null,
    user_name NVARChar(150) not Null,
    instructor_name NVARChar(150) not Null,
    course_title NVARChar(70) not Null,
    expedition_date DATE not Null,
    
    PRIMAry key (id_certificate)
);
alter table certificates modify column user_name NVARChar(150) comment 'nombre de usuario que se va a expedir en el certificado';
alter table certificates modify column instructor_name NVARChar(150) comment 'nombre del instructor que impartio el curso';
alter table certificates modify column course_title NVARChar(70) comment 'titulo del curso que aprobo el usuario';
alter table certificates modify column expedition_date DATE comment 'fecha de expedicion del certificado';

CREATe tablE users_Courses (
	id_user_course INT Not Null auto_increment,
    user_id INT Not Null,
    course_id INT Not Null,
    enroll_date DATE,
    PRIMAry key (id_user_course),
    FOREIgn key (user_id) REFeRences users (id_user) ON dEleTe cascAde,
	forEIgn key (course_id) REFeRences courses (id_course) ON dEleTe cascAde
);
alter table users_Courses modify column user_id INT comment 'codigo del usuario';
alter table users_Courses modify column course_id INT comment 'codigo del curso que compra el usuario';
alter table users_Courses modify column enroll_date DATE comment 'fecha en que el usuario se inscribe al curso';
CREATe tablE courses_Categories (
	id_course_category INT Not Null auto_increment,
    course_id INT Not Null,
    category_id INT Not Null,
    
    PRIMAry key (id_course_category),
    FOREIgn key (category_id) REFeRences categories (id_category),
    FOREIgn key (course_id) REFeRences courses (id_course) ON dEleTe cascAde
);

alter table courses_Categories modify column course_id INT comment 'codigo del curso que pertenece a una categoria';
alter table courses_Categories modify column category_id INT comment 'codigo de la categoria';

CREATe tablE users_Sections (
	id_user_section INT Not Null auto_increment,
    user_id INT Not Null,
    section_id INT Not Null,
    
    PRIMAry key (id_user_section),
    FOREIgn key (user_id) REFeRences users (id_user) ON dEleTe cascAde,
    FOREIgn key (section_id) REFeRences sections (id_section) ON dEleTe cascAde
);
alter table users_Sections modify column user_id INT comment 'codigo del usuario que adquirio una seccion de un curso';
alter table users_Sections modify column section_id INT comment 'sección que ha adquirido un usuario';

CREATE table users_Lessons (
	id_user_lesson INT NOt nUll Auto_Increment,
    user_id INT NOt nUll,
    lesson_id INT NOt nUll,
    lesson_completed BIT DEfauLt 0,
    
    PRIMARy key (id_user_lesson),
    fOREIGn key (user_id) REFErEnces users (id_user) ON DeLetE cascaDe,
    fOREIGn key (lesson_id) REFErEnces lessons (id_lesson) ON DeLetE cascaDe
);
alter table users_Lessons modify column user_id INT comment 'codigo del usuario';
alter table users_Lessons modify column lesson_id INT comment 'codigo de Leccion';
alter table users_Lessons modify column lesson_completed BIT comment 'estado de una leccion, si esta completa o en revision por el estudiante, para evaluar su progreso';

CREATE table users_Comments (
	id_user_comment INT NOt nUll Auto_Increment,
    user_id INT NOt nUll,
    comment_id INT NOt nUll,
    lesson_id INT NOt nUll,
    
    PRIMARy key (id_user_comment),
    fOREIGn key (comment_id) REFErEnces comments (id_comment),
    fOREIGn key (user_id) REFErEnces users (id_user) ON DeLetE cascaDe,
    fOREIGn key (lesson_id) REFErEnces lessons (id_lesson) ON DeLetE cascaDe
);
alter table users_Comments modify column user_id INT comment 'codigo de usuario que realiza un comentario';
alter table users_Comments modify column comment_id INT comment 'codigo de comentario';
alter table users_Comments modify column lesson_id INT comment 'codigo de la lección donde se realiza el comentario';

CREATE table Users_Messages (
	id_user_message INT NOT nuLl aUto_iNcrement,
    user_sender_id INT NOT nuLl,
    user_receptor_id INT NOT nuLl,
    message_id INT NOT nuLl,
    
    PRIMARY key (id_user_message),
    foREIGN key (message_id) REFEReNces messages (id_message),
    foREIGN key (user_sender_id) REFEReNces users (id_user) ON DElEte cascadE,
    foREIGN key (user_receptor_id) REFEReNces users (id_user) ON DElEte cascadE
);
alter table Users_Messages modify column user_sender_id INT comment 'codigo del usuario que envío el mensaje';

alter table users_messages modify column user_receptor_id INT comment 'codigo del usuario que recibe el mensaje';
alter table users_messages modify column message_id INT comment 'codigo del mensaje de texto';
CREATE Table courses_Reviews (
	id_course_review INT NOT nulL auTo_inCrement,
    course_id INT NOT nulL,
    review_id INT NOT nulL,
    user_id INT NOT nulL,
    grade TINYINT,
    
    PRIMARY key (id_course_review),
    ForEIGN key (review_id) REFEREnCes reviews (id_review),
    ForEIGN key (course_id) REFEREnCes courses (id_course) ON DELeTe Cascade,
    forEIGN key (user_id) REFEREnCes users (id_user) ON DELeTe Cascade
);
alter table courses_Reviews modify column course_id INT comment 'codigo del curso';
alter table courses_Reviews modify column review_id INT comment 'codigo del comentario con valoracion del curso'; /************************** PENDIENTE *******************************/
alter table courses_Reviews modify column user_id INT comment 'codigo del usuario que califica el curso';
alter table courses_Reviews modify column grade tINYINT comment 'puntuación que califica del curso';
CREATE TAble users_certificates (
	id_user_certificate INT NOT Null autO_incRement,
    user_id INT NOT Null,
    course_id INT NOT Null,
    certificate_id BINARY(16),
    
    PRIMARY Key (id_user_certificate),
    FOreIGN Key (certificate_id) REFERENcEs certificates (id_certificate),
    FOreIGN Key (user_id) REFERENcEs users (id_user) ON DELEtE cAscade,
    foreIGN Key (course_id) REFERENcEs courses (id_course) ON DELEtE cAscade
);

alter table users_certificates modify column user_id INT comment 'codigo del estudiante que ha sido certificado';
alter table users_certificates modify column course_id INT comment 'codigo del curso finalizado por el estudiante';
alter table users_certificates modify column certificate_id BINARY(16) comment 'codigo del certificado expedido';

CREATE TAble users_upvotes (
	id_user_upvote INT NOT Null autO_incRement,
    user_id INT NOT Null,
    comment_id INT NOT Null,
    
    PRIMARY Key (id_user_upvote),
    FOreIGN Key (user_id) REFERENcEs users (id_user) ON DELEtE cAscade,
    foreIGN Key (comment_id) REFERENcEs comments (id_comment) ON DELEtE cAscade
);
alter table users_upvotes modify column user_id INT comment 'codigo del usuario que vota positivo';
alter table users_upvotes modify column comment_id INT comment 'codigo del comentario positivo';