document.addEventListener("DOMContentLoaded", () => { 
	//aqui voy a obtener los 9 mas recientes 
	
	var endpoint= "http://localhost/api/courses?count=10&page=1&orderBy=rate";
	fetch(endpoint)
	.then(res=> res.json())
	    .then(datas=> { 
	    	console.log(datas);
	    

    if(datas.length== 0){
     
    } else {
    		var inserta4Cursos = document.getElementById("insertarRateCourses");
    	 for (var i = 0; i < datas.length; i++){ 
    	 	 var saberMultiplo = i % 3
    	 	 
        	    if( saberMultiplo  == 0 || i == 0 ){ 
        	    	 var inserta3Cursos ="cursosRecientesRate" + i;
        	    var insertaNormal = document.getElementById(inserta3Cursos);
        	    	console.log("obtendre info del curso: " + datas[i].title + datas[i].id);
			var row = `
                  
	                   <div class="card" style="width: 18rem;">
			        <!--<img class="card-img-top" src="localhost/api/courses/${datas[i].id}/image" alt="img-thumbnail" onerror="this.onerror=null;this.src='/assets/images/notUserImage.png';" style="width:60px;height:60px;">
			        -->
			        <div class="card-body">
			          <h5 class="card-title">${datas[i].title}</h5>
			          <p class="card-text">${datas[i].description}</p>
			          <a class="btn btn-primary" data-index-number="${datas[i].id}" href="http://localhost/courses/${datas[i].id}">Explorar curso</a>
			          <a id="instructorId" href="http://localhost/html/perfil_user.html?instructor=${datas[i].instructorId}" data-index-number="${datas[i].instructorId}">${datas[i].instrutorName}</a>
                   
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
                  
               insertaNormal.innerHTML = row;
        	    }else {

        	    	console.log("obtendre info del curso: " + datas[i].title + datas[i].id);
			var row = `
                  
	                   <div class="card" style="width: 18rem;">
			        <!--<img class="card-img-top" src="localhost/api/courses/${datas[i].id}/image" alt="img-thumbnail" onerror="this.onerror=null;this.src='/assets/images/notUserImage.png';" style="width:60px;height:60px;">
			        -->
			        <div class="card-body">
			          <h5 class="card-title">${datas[i].title}</h5>
			          <p class="card-text">${datas[i].description}</p>
			          <a class="btn btn-primary" data-index-number="${datas[i].id}" href="http://localhost/courses/${datas[i].id}">Explorar curso</a>
			          <a id="instructorId" href="http://localhost/html/perfil_user.html?instructor=${datas[i].instructorId}" data-index-number="${datas[i].instructorId}">${datas[i].instrutorName}</a>
                   
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
                  
               insertaNormal.innerHTML += row;

        	    }
		//getCategoryCourse(data[i].id)
		
               
               getCategoryCourse(datas[i].id);
              
               
  		}//fin del for
    	}
	});
})
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