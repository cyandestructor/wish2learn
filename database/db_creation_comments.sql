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

ALTER TABLE Users MODIFY COLUMN id_user INT COMMENT 'Codigo unico numerico que identifica a cada usuario';
ALTER TABLE Users MODIFY COLUMN username NVARCHAR(50) COMMENT 'Alias de usuario, no es un nombre necesariamente';
ALTER TABLE Users MODIFY COLUMN account_name NVARCHAR(50) COMMENT 'Nombre oficial del usuario que crea la cuenta';
ALTER TABLE Users MODIFY COLUMN account_lastname NVARCHAR(50) COMMENT 'Nombre oficial del usuario que crea la cuenta';
ALTER TABLE Users MODIFY COLUMN user_description TEXT COMMENT 'Palabras dichas por el usuario que definen su personalidad o aspectos importantes de su vida';
ALTER TABLE Users MODIFY COLUMN user_email NVARCHAR(60) COMMENT 'Correo electronico del usuario que lo identifica, y sirve para enviarle notificaciones';
ALTER TABLE Users MODIFY COLUMN user_password VARCHAR(255) COMMENT 'Combinacion de numeros, letras, y caracteres para proteger el acceso a su cuenta';
ALTER TABLE Users MODIFY COLUMN user_image MEDIUMBLOB COMMENT 'El usuario puede subir una foto que lo identifique';
ALTER TABLE Users MODIFY COLUMN user_role TINYINT COMMENT 'El usuario puede tener el rol de instructor, o de alumno';
ALTER TABLE Users MODIFY COLUMN account_creation_date DATE COMMENT 'Dia que el usuario creo la cuenta';
ALTER TABLE Users MODIFY COLUMN last_change_date DATETIME COMMENT 'Fecha de la ultima actualizacion realizada en la cuenta';
ALTER TABLE Users MODIFY COLUMN account_state TINYINT COMMENT 'Estado actual de la cuenta, debido a que puede estar activa, o suspendida';

CREATE TABLE Products (
	id_product INT NOT NULL AUTO_INCREMENT,
    product_name NVARCHAR(70),
    product_price DECIMAL(15, 2),
    
    PRIMARY KEY (id_product)
);
ALTER TABLE Products MODIFY COLUMN id_product INT COMMENT 'Codigo numerico que identifica a los productos';
ALTER TABLE Products MODIFY COLUMN product_name NVARCHAR(70) COMMENT 'Un producto es una porcion de un curso, que puede ser adquirida por un estudiante';
ALTER TABLE Products MODIFY COLUMN product_price DECIMAL(15, 2) COMMENT 'Precio en pesos mexicanos del producto';


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
ALTER TABLE Courses MODIFY COLUMN course_title NVARCHAR(70) COMMENT 'Titulo que asigna un instructor para definir las caracteristicas y aprendizajes de un curso';
ALTER TABLE Courses MODIFY COLUMN  course_description TEXT COMMENT 'Descripcion que proporciona un instructor acerca del curso';
ALTER TABLE Courses MODIFY COLUMN  course_image MEDIUMBLOB COMMENT 'Imagen que describe en forma general el contenido del curso';
ALTER TABLE Courses MODIFY COLUMN  product_id INT COMMENT 'Codigo numerico que identifica el numero del producto';
ALTER TABLE Courses MODIFY COLUMN  instructor_id INT COMMENT 'Codigo numerico que identifica al creador del curso';
ALTER TABLE Courses MODIFY COLUMN  publication_date DATETIME COMMENT 'Fecha de publicacion pública del curso';
aLTER tABLE Courses mODIFY cOLUMN  last_update DATETIME cOMMENT 'Fecha en la que se actualizo la informacion del curso';
aLTER tABLE Courses mODIFY cOLUMN  published BIT cOMMENT 'Estado del curso, por ejemplo publicado u oculto';
CREATE TABLE Categories (
	id_category INT NOT NULL AUTO_INCREMENT,
    category_name NVARCHAR(50) NOT NULL,
    category_description TEXT,
    
    PRIMARY KEY (Id_category)
);
aLTER tABLE Categories mODIFY cOLUMN category_name NVARCHAR(50) cOMMENT 'Nombre de la categoria';
aLTER tABLE Categories mODIFY cOLUMN category_description TEXT cOMMENT 'Descripcion de la categoria';

CREATE TABLE Sections (
	id_section INT NOT NULL AUTO_INCREMENT,
    section_title NVARCHAR(50) NOT NULL,
    section_is_free BIT DEFAULT 0,
    course_id INT NOT NULL,
    product_id INT,
    published BIT DEFAULT 1,
    
    PRIMARY KEY (Id_section),
	FOREIGN KEY (Product_id) REFERENCES Products (Id_product),
    FOREIGN KEY (Course_id) REFERENCES Courses (Id_course) ON DELETE CASCADE
);

aLTER tABLE Sections mODIFY cOLUMN section_title NVARCHAR(50) cOMMENT 'Titulo de la sección';
alTER TaBLE Sections moDIFY CoLUMN Section_is_free BIT CoMMENT 'Estado del curso en cuanto si es de paga o gratuito';
alTER TaBLE Sections moDIFY CoLUMN Course_id INT CoMMENT 'Curso al que pertenece la seccion';
alTER TaBLE Sections moDIFY CoLUMN Product_id INT CoMMENT 'Codigo de producto asignado a la sección';
altER TAbLE SEctions modIFY COlUMN PUblished BIT COmMENT 'Estado de publicacion de la seccion es decir si esta publicada o no';


CREATE TABLE LEssons (
	Id_lesson INT NOT NULL AUTO_INCREMENT,
    lesson_title NVARCHAR(50) NOT NULL,
    content_type TINYINT,
    lesson_text MEDIUMTEXT,
    section_id INT NOT NULL,
    published BIT DEFAULT 1,
    
    PRIMARY KEY (Id_lesson),
    FOREIGN KEY (SeCtion_id) REFERENCES SEctions (id_section) ON DELETE CASCADE
);
AltER TAbLE LEssons modIFY COlUMN LEsson_title NVARCHAR(50) COmMENT 'Titulo de la leccion';
altER TAbLE LEssons modIFY COlUMN COntent_type TINYINT COmMENT 'Tipo de contenido, por ejemplo pdf, texto, entre otros formatos'; /* **************************** PENDIENTE   ************************ */
altER TAbLE LEssons modIFY COlUMN LEsson_text MEDIUMTEXT COmMENT 'Texto de la lección que introduce el instructor';
alteR TABlE LESsons modiFY COLuMN SECtion_id INT COMmENT 'COdigo de la seccion a la que pertenece';
alteR TABlE LESsons modiFY COLuMN PUBlished BIT COMmENT 'EStado de publicacion de la leccion es decir si esta publicada o no';

CREATE TABLE RESources (
	iD_resource INT NOT NULL AUTO_INCREMENT,
    resource_content LONGBLOB,
    content_type varcHAR(50),
    lesson_id INT NOT NULL,
    PRIMARY KEY (ID_Resource),
    FOREIGN KEY (LEsSon_id) REFERENCES LESsons (id_Lesson) ON DELETE CASCADE
);
aLteR TABlE RESources modiFY COLuMN RESource_content LONGBLOB COMmENT 'COntenido de los recursos, archivos necesarios para cumplir con el aprendizaje esperado';
alteR TABlE RESources modiFY COLuMN LESson_id BIT COMmENT 'COdigo para saber a que leccion pertenece el recurso';

CREATE TABLE COMments (
	iD_comment INT NOT NULL AUTO_INCREMENT,
    comment_body TEXT,
    comment_upvotes INT DEFAULT 0,
    comment_date DATETIME,
    comment_parent_id INT,
    published BIT DEFAULT 1,
    
    PRIMARY KEY (ID_Comment),
    FOREIGN KEY (COmMent_parent_id) REFERENCES COMments (id_Comment)
);

AlteR TABlE COMments modiFY COLuMN COMment_body TEXT COMmENT 'COntenido de un comentario que ha hecho un usuario';
alteR TABlE COMments modiFY COLuMN COMment_upvotes INT COMmENT 'VOtos positivos de un comentario';
alteR TABlE COMments modiFY COLuMN COMment_date DATETIME COMmENT 'FEcha en que se realizo un comentario';
alteR TABlE COMments modiFY COLuMN COMment_parent_id INT COMmENT 'INdica si un comentario respondio a otro';
alteR TABlE COMments modiFY COLuMN PUBlished BIT COMmENT 'EStado de un comentario, si esta publicado';
CREATE TABLE VIDeos (
	iD_video INT NOT NULL AUTO_INCREMENT,
    video_address NVARCHAR(100),
    video_duration INT,
    lesson_id INT,
    
    PRIMARY KEY (ID_Video),
    FOREIGN KEY (LEsSon_id) REFERENCES LESsons (id_Lesson)
);
aLteR TABlE VIDeos modiFY COLuMN VIDeo_address NVARCHAR(100) COMmENT 'LInk de almacenamiento del video de un recurso para una lección';
alter TABLe VIDEos modifY COLUmN VIDEo_duration INT cOMMeNT 'DURacion de un video';
alter TABLe VIDEos modifY COLUmN LESSon_id INT cOMMeNT 'CODigo de la leccion a la que pertenece el video';

CREATE TABLE MESSages (
	id_message INT NOT NULL AUTO_INCREMENT,
    message_body MEDIUMTEXT,
    message_date DATETIME,
    
    PRIMARY KEY (ID_mEssage)
);
AlTer TABLe MESSages modifY COLUmN MESSage_body INT cOMMeNT 'CONtenido del mensaje enviado entre usuarios';
alter TABLe MESSages modifY COLUmN MESSage_date INT cOMMeNT 'FECha de envio de un mensaje';

CREATE TABLE REVIews (
	id_review INT NOT NULL AUTO_INCREMENT,
    review_body TEXT,
    review_date DATETIME,
    published BIT DEFAULT 1,
    
    PRIMARY KEY (ID_rEview)
);
AlTer TABLe REVIews modifY COLUmN REVIew_body TEXT COMMeNT 'CONtenido de los comentarios con valoraciones que ponen los usuarios a un curso'; /*  ************************ PENDIENTE ******************/
alter TABLe REVIews modifY COLUmN REVIew_date DATETIME COMMeNT 'FECha de envio comentario con valoracion';
alter TABLe REVIews modifY COLUmN PUBLished BIT cOMMeNT 'ESTado de la publicacion, publicado u oculto';

CREATE TABLE CERTificates (
	id_certificate BINARY(16) NOT NULL,
    user_name NVARCHAR(150) NOT NULL,
    instructor_name NVARCHAR(150) NOT NULL,
    course_title NVARCHAR(70) NOT NULL,
    expedition_date DATE NOT NULL,
    
    PRIMARY KEY (ID_cErtificate)
);
AlTer TABLe CERTificates modifY COLUmN USER_name NVARCHAR(150) COMMeNT 'NOMbre de usuario que se va a expedir en el certificado';
alter TABLe CERTificates modifY COLUmN INSTructor_name NVARCHAR(150) COMMeNT 'NOMbre del instructor que impartio el curso';
alter TABLe CERTificates modifY COLUmN COURse_title NVARCHAR(70) COMMeNT 'TITulo del curso que aprobo el usuario';
alter TABLe CERTificates modifY COLUmN EXPEdition_date DATE COMMeNT 'FECha de expedicion del certificado';

CREATE TABLE USERs_Courses (
	id_user_course INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    enroll_date DATE,
    PRIMARY KEY (ID_uSer_course),
    FOREIGN KEY (USEr_id) REFERENCES USERs (id_uSer) ON DELETE CASCADE,
	FOREIGN KEY (COUrSe_id) REFERENCES COURses (id_cOurse) ON DELETE CASCADE
);
AlTer TABLe USERs_Courses modifY COLUmN USER_id INT cOMMeNT 'CODigo del usuario';
alter TABLe USERs_Courses modifY COLUmN COURse_id INT cOMMeNT 'CODigo del curso que compra el usuario';
alter TABLe USERs_Courses modifY COLUmN ENROll_date DATE COMMeNT 'FECha en que el usuario se inscribe al curso';
CREATE TABLE COURses_Categories (
	id_course_category INT NOT NULL AUTO_INCREMENT,
    course_id INT NOT NULL,
    category_id INT NOT NULL,
    
    PRIMARY KEY (ID_cOurse_category),
    FOREIGN KEY (CATeGory_id) REFERENCES CATEgories (id_cAtegory),
    FOREIGN KEY (COUrSe_id) REFERENCES COURses (id_cOurse) ON DELETE CASCADE
);

aLter TABLe COURses_Categories modifY COLUmN COURse_id INT cOMMeNT 'CODigo del curso que pertenece a una categoria';
alter TABLe COURses_Categories modifY COLUmN CATEgory_id INT cOMMeNT 'CODigo de la categoria';

CREATE TABLE USERs_Sections (
	id_user_section INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    section_id INT NOT NULL,
    
    PRIMARY KEY (ID_uSer_section),
    FOREIGN KEY (USEr_id) REFERENCES USERs (id_uSer) ON DELETE CASCADE,
    FOREIGN KEY (SECtIon_id) REFERENCES SECTions (id_sEction) ON DELETE CASCADE
);
AlTer TABLe USERs_Sections modifY COLUmN USER_id INT cOMMeNT 'CODigo del usuario que adquirio una seccion de un curso';
alter TABLe USERs_Sections modifY COLUmN SECTion_id INT cOMMeNT 'SECción que ha adquirido un usuario';

CREATE TABLE USERS_Lessons (
	id_User_lesson INT NOT NULL AUTO_INCREMENT,
    User_id INT NOT NULL,
    Lesson_id INT NOT NULL,
    Lesson_completed BIT DEFAULT 0,
    
    PRIMARY KEY (iD_UsEr_lesson),
    FOREIGN KEY (uSER_Id) REFERENCES USERS (id_usEr) ON DELETE CASCADE,
    FOREIGN KEY (lESSoN_id) REFERENCES LESSOns (id_leSson) ON DELETE CASCADE
);
ALtEr TABLE USERS_Lessons modify COLUMn USER_id INT coMMEnT 'CODIgo del usuario';
alter TABLE USERS_Lessons modify COLUMn LESSOn_id INT coMMEnT 'CODIgo de Leccion';
alter TABLE USERS_Lessons modify COLUMn LESSOn_completed BIT coMMEnT 'ESTAdo de una leccion, si esta completa o en revision por el estudiante, para evaluar su progreso';

CREATE TABLE USERS_Comments (
	id_User_comment INT NOT NULL AUTO_INCREMENT,
    User_id INT NOT NULL,
    Comment_id INT NOT NULL,
    Lesson_id INT NOT NULL,
    
    PRIMARY KEY (iD_UsEr_comment),
    FOREIGN KEY (cOMMeNt_id) REFERENCES COMMEnts (id_coMment),
    FOREIGN KEY (uSER_Id) REFERENCES USERS (id_usEr) ON DELETE CASCADE,
    FOREIGN KEY (lESSoN_id) REFERENCES LESSOns (id_leSson) ON DELETE CASCADE
);
ALtEr TABLE USERS_Comments modify COLUMn USER_id INT coMMEnT 'CODIgo de usuario que realiza un comentario';
alter TABLE USERS_Comments modify COLUMn COMMEnt_id INT coMMEnT 'CODIgo de comentario';
alter TABLE USERS_Comments modify COLUMn LESSOn_id INT coMMEnT 'CODIgo de la lección donde se realiza el comentario';

CREATE TABLE USERS_Messages (
	id_uSer_message INT NOT NULL AUTO_INCREMENT,
    USer_sender_id INT NOT NULL,
    USer_receptor_id INT NOT NULL,
    MEssage_id INT NOT NULL,
    
    PRIMARY KEY (Id_USeR_message),
    FOREIGN KEY (MeSSAgE_id) REFERENCES MESSAGes (id_mesSage),
    FOREIGN KEY (UsER_sEnder_id) REFERENCES USERS (id_useR) ON DELETE CASCADE,
    FOREIGN KEY (UsER_rEceptor_id) REFERENCES USERS (id_useR) ON DELETE CASCADE
);
ALTeR tABLE USERS_Messages modify COLUMN USER_Sender_id INT comMENt 'CODIGo del usuario que envío el mensaje';

alter taBLE UsERS_Messages modify cOLUMN uSER_REceptor_id INT commENT 'CODIGO del usuario que recibe el mensaje';
alter taBLE UsERS_Messages modify cOLUMN mESSAGE_id INT commENT 'CODIGO del mensaje de texto';
CREATE TABLE CoURSES_Reviews (
	id_coUrse_review INT NOT NULL AUTO_INCREMENT,
    COUrse_id INT NOT NULL,
    REView_id INT NOT NULL,
    USEr_id INT NOT NULL,
    GRAde TINYINT,
    
    PRIMARY KEY (ID_COUrSe_review),
    FOREIGN KEY (REvIEW_Id) REFERENCES REVIEWS (id_reviEw),
    FOREIGN KEY (COuRSE_Id) REFERENCES COURSES (id_courSe) ON DELETE CASCADE,
    FOREIGN KEY (USeR_Id) REFERENCES USERS (id_user) ON DELETE CASCADE
);
ALTEr taBLE CoURSES_Reviews modify cOLUMN cOURSE_id INT commENT 'CODIGO del curso';
alter taBLE CoURSES_Reviews modify cOLUMN rEVIEW_id INT commENT 'CODIGO del comentario con valoracion del curso'; /************************** PENDIENTE *******************************/
alter taBLE CoURSES_Reviews modify cOLUMN uSER_ID INT commENT 'CODIGO del usuario que califica el curso';
alter taBLE CoURSES_Reviews modify cOLUMN gRADE TINYINT COMMENT 'PUNTUAción que califica del curso';
CREATE TABLE USeRS_CErtificates (
	id_useR_certificate INT NOT NULL AUTO_INCREMENT,
    USER_id INT NOT NULL,
    COURse_id INT NOT NULL,
    CERTificate_id BINARY(16),
    
    PRIMARY KEY (ID_uSER_Certificate),
    FOREIGN KEY (CERtIFIcAte_id) REFERENCES CERTIFICates (id_certiFicate),
    FOREIGN KEY (USEr_ID) REFERENCES USERS (Id_user) ON DELETE CASCADE,
    FOREIGN KEY (COUrSE_iD) REFERENCES COURSES (id_coursE) ON DELETE CASCADE
);

ALTEr tabLE USeRS_CErtificates modify coLUMN UsER_ID INT commeNT 'CODIGO del estudiante que ha sido certificado';
alter tabLE USeRS_CErtificates modify coLUMN CoURSE_Id INT commeNT 'CODIGO del curso finalizado por el estudiante';
alter tabLE USeRS_CErtificates modify coLUMN CeRTIFICate_id BINARY coMMENT 'CODIGO del certificado expedido';

CREATE TABLE USeRS_UPvotes (
	id_useR_upvote INT NOT NULL AUTO_INCREMENT,
    USER_id INT NOT NULL,
    COMMent_id INT NOT NULL,
    
    PRIMARY KEY (ID_uSER_Upvote),
    FOREIGN KEY (USEr_ID) REFERENCES USERS (Id_user) ON DELETE CASCADE,
    FOREIGN KEY (COMmENT_Id) REFERENCES COMMENTS (id_commeNt) ON DELETE CASCADE
);
ALTER TabLE USeRS_UPvotes modify coLUMN UsER_ID INT commeNT 'CODIGO del usuario que vota positivo';
alter tabLE USeRS_UPvotes modify coLUMN CoMMENT_id INT commeNT 'CODIGO del comentario positivo';