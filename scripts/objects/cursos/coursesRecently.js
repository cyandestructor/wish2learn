document.addEventListener("DOMContentLoaded", () => { 
	//aqui voy a obtener los 9 mas recientes 
	
	var endpoint= "http://localhost/api/courses?count=9&page=1&orderBy=publication";
	fetch(endpoint)
	.then(res=> res.json())
	    .then(datas=> { 
	    	console.log(datas);
	    	coursesRecently(datas);
	    });
})

function coursesRecently(data){
	//cursosRecientesItem
	var infoCurso="hola";
	var inserta3Cursos = "cursosRecientesItem";

     let saberMultiplo;  
      
     var insertaNormal ="si"; 
     var cadena="";
    if(data.length== 0){
   
    } else {
    	//  for (var i = 0; i < data.length; i++){
    		console.log("entra a courses recently")
        for (var i = 0; i < data.length; i++){
        	   saberMultiplo = i % 3
        	    if( saberMultiplo  == 0 || i == 0 ){ 
        	    	 cadena = data[i].instrutorName.toUpperCase();
        	    inserta3Cursos ="cursosRecientesItem" + i;
        	     insertaNormal = document.getElementById(inserta3Cursos);
        	    
        	     console.log(inserta3Cursos);
	                var row = `
                  
	                    <div class="col-md-4">
		                <div class="card mb-2" style="height: 100%;">
		                  <img class="card-img-top" src="localhost/api/courses/${data[i].id}/image"
		                       alt="Card image cap" onerror="this.onerror=null;this.src='/assets/images/notUserImage.png';" style="width:60px;height:60px;">
		                  <div class="card-body">
		                    <h4 class="card-title">${data[i].title}</h4>
		                    <!--<h6> <h6>-->
		                    <a id="instructorId" href="http://localhost/html/perfil_user.html?instructor=${data[i].instructorId}" data-index-number="${data[i].instructorId}">${data[i].instrutorName}</a>
                   
		                    <p class="card-text">${data[i].description}</p>
		                    <p class="card-text">${data[i].price}</p>
		                     <a class="btn btn-primary" href="http://localhost/courses/${data[i].id}">Explorar curso</a>
		                   
		                  </div>
		                </div>
		              </div>
		            
                   `;
               insertaNormal.innerHTML = row;

        	    }else{
        	    	  console.log(inserta3Cursos);
        	    	  cadena = data[i].instrutorName.toUpperCase();
 				 var row = `
                  
	                    <div class="col-md-4">
		                <div class="card mb-2" style="height: 100%;">
		                  <img class="card-img-top" src="localhost/api/courses/${data[i].id}/image"
		                       alt="Card image cap">
		                  <div class="card-body">
		                    <h4 class="card-title">${data[i].title}</h4>
		                     <a id="instructorId" href="http://localhost/html/perfil_user.html?instructor=${data[i].instructorId}" data-index-number="${data[i].instructorId}">${data[i].instrutorName}</a>
                   
		                    <p class="card-text">${data[i].description}</p>
		                    <p class="card-text">${data[i].price}</p>
		                    <a class="btn btn-primary" href="http://localhost/courses/${data[i].id}">Explorar curso</a>
		                  </div>
		                </div>
		              </div>
		            
                   `;
                    insertaNormal.innerHTML += row;
        	    }
              
               // listaCategorias.appendChild(item);
         }
     }
}

