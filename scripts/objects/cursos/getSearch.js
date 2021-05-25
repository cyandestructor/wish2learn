var resultado1= "sin resultado";
var resultado2= "sin resultado";
document.addEventListener("DOMContentLoaded", () => { 
	const params = new URLSearchParams(window.location.search);
	console.log(params.toString());
	var buscarCurso = params.get('curso');
	var endpoint = "http://localhost/api/results?query=" + buscarCurso + "&count=10";
	fetch(endpoint)
	.then(res=> res.json())
	    .then(datas=> { 
	    	console.log(datas);
	    	//var insertarBusqueda=document.getElementById('insertarCursosBusqueda');
	    	var insertarBusqueda=document.getElementById('insertarCursosBusqueda');
var row;
  for (var i = 0; i < datas.length; i++){ 
		//getCategoryCourse(data[i].id)
		console.log("obtendre info del curso: " + datas[i].title + datas[i].id);
			 row = `
                  
	                   <div class="col-md-3 card" style="width: 18rem;">
			        <!--<img class="card-img-top" src="localhost/api/courses/${datas[i].id}/image" alt="img-thumbnail">
			        -->
			        <div class="card-body">
			          <h5 class="card-title">${datas[i].title}</h5>
			          <p class="card-text">${datas[i].description}</p>
			          <a class="btn btn-primary" data-index-number="${datas[i].id}" href="http://localhost/courses/${datas[i].id}">Explorar curso</a>
			          
			        </div>
			        <ul class="list-group list-group-flush">
			          <li class="list-group-item"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
			            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
			          </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
			            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
			          </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
			            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
			          </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
			            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
			          </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
			            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
			          </svg></li>
			      
			        </ul>
			        <ul id="queCategoria`+ datas[i].id +`">
			        </ul>
			        <div class="card-body">
			          <a href="#" class="card-link">${datas[i].price}</a>
			        </div>
			</div>
		            
                   `;
                   console.log("ya dibujo el card");
               insertarBusqueda.innerHTML += row;
                console.log("va para la funcion de las categorias");
               getCategoryCourse(datas[i].id);
              
               console.log("otro curso: ");
  		}//fin del for
	    	
	});
})

function completarBusqueda(data){

}

function getCategoryCourse(id){
	
	var endpointGetCategory= "http://localhost/api/courses/" + id + "/categories" ;
	
	var insertaCategoriaBien = "queCategoria" + id;
	console.log(insertaCategoriaBien);
	

	//var categoryDescrip =  document.getElementById('categoryDescription');
	var row="Hola";
 	fetch(endpointGetCategory)
	.then(res=> res.json())
	    .then(datas=> {
		var obtenerCategoria = document.getElementById(insertaCategoriaBien);
		for (var i = 0; i < datas.length; i++){ 
			//
			
			var divNota = document.createElement("li");
			  //divNota.setAttribute("id", iddd);
			  //divNota.setAttribute("class", "tags") 
			  divNota.textContent = datas[i].name;;
			  obtenerCategoria.appendChild(divNota);
			
			/*obtenerCategoria.innerHTML += `
				<li>${datas[i].name}</li>
					console.log(obtenerCategoria.innerHTML);
			`;*/
		
	   		console.log("estoy generando la etiqueta li para el curso " + id )
		}	
	    });
	
}
/*function getCategoryCourse(id, resultado1, resultado2){
	var resultado1Cat;
	var resultado2Cat;
	var resultado;
	var endpointGetCategory= "http://localhost/api/courses/" + id + "/categories" ;
	
	var insertaCategoriaBien = "queCategoria" + id;
	console.log(insertaCategoriaBien);
	var obtenerCategoria = document.getElementById(insertaCategoriaBien);

	//var categoryDescrip =  document.getElementById('categoryDescription');
	var row="Hola";
 	fetch(endpointGetCategory)
	.then(res=> res.json())
	    .then(datas=> {
		
		for (var i = 0; i < datas.length; i++){ 
			resultado1 = datas[i].name;
	 		resultado2 = datas[i].description;
	   
		}	
	    });
	resultado = (id + resultado1 + resultado2);
	console.log(resultado);
	return resultado;
	   
		
}*/