document.addEventListener("DOMContentLoaded", () => { 
	//aqui voy a obtener los 9 mas recientes 
	
	var endpoint= "http://localhost/api/courses?count=10&page=1&orderBy=sales";
	fetch(endpoint)
	.then(res=> res.json())
	    .then(datas=> { 
	    	console.log(datas);
	    

    if(datas.length== 0){
     
    } else {
    		var inserta4Cursos = document.getElementById("insertarSellerCourses");
    	 for (var i = 0; i < datas.length; i++){ 
    	 	 var saberMultiplo = i % 3
    	 	 
        	    if( saberMultiplo  == 0 || i == 0 ){ 
        	    	 var inserta3Cursos ="cursosRecientesSeller" + i;
        	    var insertaNormal = document.getElementById(inserta3Cursos);
        	    	console.log("obtendre info del curso: " + datas[i].title + datas[i].id);
			var row = `
                  
	                   <div class="card" style="width: 18rem;margin:10px;">
			        <!--<img class="card-img-top" src="localhost/api/courses/${datas[i].id}/image" alt="img-thumbnail" onerror="this.onerror=null;this.src='/assets/images/notUserImage.png';" style="width:60px;height:60px;">
			        -->
			        <div class="card-body">
			          <h5 class="card-title">${datas[i].title}</h5>
			          <p class="card-text">${datas[i].description}</p>
			          <a class="btn btn-primary" data-index-number="${datas[i].id}" href="http://localhost/courses/${datas[i].id}">Explorar curso</a>
			          <a id="instructorId" style="display:block;" href="http://localhost/html/perfil_user.html?instructor=${datas[i].instructorId}" data-index-number="${datas[i].instructorId}">${datas[i].instrutorName}</a>
                   
			        </div>
			        <ul id="meterStarSales${datas[i].id}" class="list-group list-group-flush" style="display: inline-block;">
			        
			      
			        </ul>
			        <ul id="queCategoria`+ datas[i].id +`">
			        </ul>
			        <div class="card-body">
			          <a href="#" class="card-link">${datas[i].price}</a>
			        </div>
			</div>
		            
                   `;
                  
               insertaNormal.innerHTML = row;
if(datas[i].grade == null){
            cualgrade = 0;
           }else{
             var cualgrade = parseInt(datas[i].grade, 10);
           }
          

            if(5 == cualgrade){

              var cadena="meterStarSales"+ datas[i].id;
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
               
               var cadena="meterStarSales"+ datas[i].id
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
             
                 var cadena="meterStarSales"+ datas[i].id
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
             
                var cadena="meterStarSales"+ datas[i].id
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
               
              var cadena="meterStarSales"+ datas[i].id
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
               
                 var cadena="meterStarSales"+ datas[i].id
               var cualStarr= document.getElementById(cadena);
               cualStarr.innerHTML +=  `
               <span class="fa fa-star "></span>
              <span class="fa fa-star "></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star "></span>
                `;
             }
               //fin de las stars
        	    }else {

        	    	console.log("obtendre info del curso: " + datas[i].title + datas[i].id);
			var row = `
                  
	                   <div class="card" style="width: 18rem;margin:10px;">
			        <!--<img class="card-img-top" src="localhost/api/courses/${datas[i].id}/image" alt="img-thumbnail" onerror="this.onerror=null;this.src='/assets/images/notUserImage.png';" style="width:60px;height:60px;">
			        -->
			        <div class="card-body">
			          <h5 class="card-title">${datas[i].title}</h5>
			          <p class="card-text">${datas[i].description}</p>
			          <a class="btn btn-primary" data-index-number="${datas[i].id}" href="http://localhost/courses/${datas[i].id}">Explorar curso</a>
			          <a id="instructorId" style="display:block;" href="http://localhost/html/perfil_user.html?instructor=${datas[i].instructorId}" data-index-number="${datas[i].instructorId}">${datas[i].instrutorName}</a>
                   
			        </div>
			        <ul id="meterStarSales${datas[i].id}" class="list-group list-group-flush" style="display: inline-block;">
			        
			      
			        </ul>

			        <ul id="queCategoria`+ datas[i].id +`">
			        </ul>
			        <div class="card-body">
			          <a href="#" class="card-link">${datas[i].price}</a>
			        </div>
			</div>
		            
                   `;
                  
               insertaNormal.innerHTML += row;

               if(datas[i].grade == null){
            cualgrade = 0;
           }else{
             var cualgrade = parseInt(datas[i].grade, 10);
           }
          

            if(5 == cualgrade){

              var cadena="meterStarSales"+ datas[i].id;
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
               
               var cadena="meterStarSales"+ datas[i].id
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
             
                 var cadena="meterStarSales"+ datas[i].id
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
             
                var cadena="meterStarSales"+ datas[i].id
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
               
              var cadena="meterStarSales"+ datas[i].id
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
               
                 var cadena="meterStarSales"+ datas[i].id
               var cualStarr= document.getElementById(cadena);
               cualStarr.innerHTML +=  `
               <span class="fa fa-star "></span>
              <span class="fa fa-star "></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star "></span>
                `;
             }
               //fin de las stars

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