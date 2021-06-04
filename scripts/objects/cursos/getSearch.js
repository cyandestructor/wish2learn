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
                  
	                   <div class="col-md-3 card" style="width: 18rem; margin:10px;">
			        <!--<img class="card-img-top" src="localhost/api/courses/${datas[i].id}/image" alt="img-thumbnail">
			        -->
			        <div class="card-body">
			          <h5 class="card-title">${datas[i].title}</h5>
			          <p class="card-text">${datas[i].description}</p>
			          <a class="btn btn-primary" data-index-number="${datas[i].id}" href="http://localhost/courses/${datas[i].id}">Explorar curso</a>
			          
			        </div>
			        
			        <ul id="meterStar${datas[i].id}" class="list-group list-group-flush" style="display: inline-block;">
			        
			      
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
                if(datas[i].grade == null){
            cualgrade = 0;
           }else{
             var cualgrade = parseInt(datas[i].grade, 10);
           }
          

            if(5 == cualgrade){

              var cadena="meterStar"+ datas[i].id;
               var cualStarr= document.getElementById(cadena);
               cualStarr.innerHTML +=  `
               <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
                `;
            
             }
              if(4 == cualgrade){
               
               var cadena="meterStar"+ datas[i].id
               var cualStarr= document.getElementById(cadena);
               cualStarr.innerHTML +=  `
               <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star "></span>
                `;
             } 
             if(3 == cualgrade){ 
             
                 var cadena="meterStar"+ datas[i].id
               var cualStarr= document.getElementById(cadena);
               cualStarr.innerHTML +=  `
               <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star "></span>
                `;
             }
             if(2 == cualgrade){
             
                var cadena="meterStar"+ datas[i].id
               var cualStarr= document.getElementById(cadena);
               cualStarr.innerHTML +=  `
               <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star "></span>
                `;
             }
              if(1 == cualgrade){
               
              var cadena="meterStar"+ datas[i].id
               var cualStarr= document.getElementById(cadena);
               cualStarr.innerHTML +=  `
               <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star "></span>
                `;
             }
              if(0 == cualgrade){
               
                 var cadena="meterStar"+ datas[i].id
               var cualStarr= document.getElementById(cadena);
               cualStarr.innerHTML +=  `
               <span class="fa fa-star "></span>
              <span class="fa fa-star "></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star "></span>
                `;
             }
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