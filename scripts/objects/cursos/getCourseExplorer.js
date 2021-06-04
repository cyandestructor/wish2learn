document.addEventListener("DOMContentLoaded", () => {  

  const path = window.location.pathname;
  const courseId = path.substr(path.lastIndexOf("/") + 1); // Ex. /users/{id}

  var titleCourse = document.getElementById("titleCourse");
  var descriptionCourse = document.getElementById("descriptionCourse");
  var fechaUActualizacion = document.getElementById("fechaUltimaActualizacion");
   var queInstructor = document.getElementById("nombreInstructorCurso");
    var queCursoCompro = document.getElementById("comprarCurso");
    var queInstructorIdd = document.getElementById("queInstructorID");
    var queProductoId = document.getElementById("queProductoId");
   var idInstructor;
	var endpoint= "http://localhost/api/courses/" + courseId; 
	fetch(endpoint)
	.then(res=> res.json())
	    .then(datas=> { 
	    	console.log(datas);
	    	//getCourseExplore(datas);
	    	titleCourse.innerHTML = datas.title;
	    	descriptionCourse.innerHTML = datas.description;
	    	fechaUActualizacion.innerHTML = "Fecha de la ultima actualización " + datas.lastUpdate;
	    	queInstructor.innerHTML =  ` <a id="nombreInstructorCurso" href="/html/perfil_user.html?instructor=${datas.instructorId}">${datas.instrutorName}</a> 
	    	`;

	    	queCursoCompro.dataset.indexNumber = courseId;
	    	queInstructorIdd.dataset.indexNumber = datas.instructorId;
	    	queProductoId.dataset.indexNumber = datas.productId;
	    	console.log("idd instructor" + datas.instructorId);
	    	getUserAsociadoCurso(datas.instructorId);
	    	getCategoryCourse(datas.id);
	    });
})

function getCategoryCourse(id){
	var endpointGetCategory= "http://localhost/api/courses/" + id + "/categories";
	var obtenerCategoria = document.getElementById('categoriaCurso');
	var categoryDescrip =  document.getElementById('categoryDescription');
 fetch(endpointGetCategory)
	.then(res=> res.json())
	    .then(datas=> { 
	    	console.log(datas);
	    	for (var i = 0; i < datas.length; i++){ 
			obtenerCategoria.innerHTML = `${datas[i].name}`;
	    	categoryDescrip.innerHTML=`${datas[i].description}`;
	    	cursosRelacionados(datas[i].name);
	    	}
	    	
	    });
}

function getUserAsociadoCurso(id){
 	var endpointIdUser= "http://localhost/api/users/" + id; 
 	var nameInstructor = document.getElementById("nameCompleteInstructor");
 	var descriptionInstructor = document.getElementById("descriptionInstructor");

	fetch(endpointIdUser)
	.then(res=> res.json())
    .then(datas=> { 
    	console.log(datas);
    	nameInstructor.innerHTML = datas.name + " " + datas.lastname;
    	if(datas.description== null){
			descriptionInstructor.innerHTML =  ` Sin descripción `;
    	}else {
    		descriptionInstructor.innerHTML = datas.description;
    	}
    	
    	obtenerAvatarInstructor(datas.id);
	 });
}
function obtenerAvatarInstructor(id){
	var avatarInstructor = document.getElementById("insertarAvatarInstructor");
	//var endpointIdUser= "http://localhost/api/users/"+ id + "/avatar "; 
	avatarInstructor.innerHTML =  ` <br><br>
 			<img src="http://localhost/api/users/` + id +`/avatar" class="rounded img-peq" alt="Cinque Terre" onerror="this.onerror=null;this.src='/assets/images/notUserImage.png';" >
		`;
	/*fetch(endpointIdUser)
	.then(res=> res.json())
    .then(datas=> {  
    	console.log(datas);
		
    });*/
}
 function cursosRelacionados(cursoRel){
 	var cursoRelacionado = encodeURIComponent(cursoRel);
 	var endpoint="http://localhost/api/results?query=" + cursoRelacionado +"&count=10";
 	console.log(endpoint);
    //El query puede ser el nombre de una categoría
    var inserta3Cursos = "cursosRelacionadosItem";

     let saberMultiplo;  
      
     var insertaNormal ="si"; 
     var cadena="";

    fetch(endpoint)
	.then(res=> res.json())
	    .then(datas=> { 
	    	console.log(datas);
	    	for (var i = 0; i < datas.length; i++){
        	   saberMultiplo = i % 3
        	    if( saberMultiplo  == 0 || i == 0 ){ 
        	    	 cadena = datas[i].instrutorName.toUpperCase();
        	    inserta3Cursos ="cursosRelacionadosItem" + i;
        	     insertaNormal = document.getElementById(inserta3Cursos);
        	     console.log(inserta3Cursos);
	                var row = `
                  
	                    <div class="col-md-4">
		                <div class="card mb-2" style="height: 100%;">
		                  <img class="card-img-top" src="localhost/api/courses/${datas[i].id}/image"
		                       alt="Card image cap">
		                  <div class="card-body">
		                    <h4 class="card-title">${datas[i].title}</h4>
		                    <h6>`+cadena+` <h6>
		                    <p class="card-text">${datas[i].description}</p>
		                    <p class="card-text">${datas[i].price}</p>
		                    <a class="btn btn-primary">Button</a>
		                  </div>
		                </div>
		              </div>
		            
                   `;
               insertaNormal.innerHTML = row;

        	    }else{
        	    	  console.log(inserta3Cursos);
        	    	  cadena = datas[i].instrutorName.toUpperCase();
 				 var row = `
                  
	                    <div class="col-md-4">
		                <div class="card mb-2" style="height: 100%;">
		                  <img class="card-img-top" src="localhost/api/courses/${datas[i].id}/image"
		                       alt="Card image cap">
		                  <div class="card-body">
		                    <h4 class="card-title">${datas[i].title}</h4>
		                     <h6>`+cadena+`<h6>
		                    <p class="card-text">${datas[i].description}</p>
		                    <p class="card-text">${datas[i].price}</p>
		                    <a class="btn btn-primary" href="http://localhost/courses/${datas[i].id}">Explorar curso</a>
		                  </div>
		                </div>
		              </div>
		            
                   `;
                    insertaNormal.innerHTML += row;
        	    }
              
               // listaCategorias.appendChild(item);
         }
	    });
 }
