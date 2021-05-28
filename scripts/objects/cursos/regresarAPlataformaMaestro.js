
document.addEventListener("DOMContentLoaded", () => { 

  var endpointSesion = "http://localhost/api/session";
  var btnRegreso = document.getElementById('insertarRegreso');
  fetch(endpointSesion)
  .then(response =>{
    if(response.ok){
	    		//alert("todo esta OK");
	    	}
	    	return response.json();
	    }) 
  .then(datas=> { 
  	console.log(datas);
  	btnRegreso.innerHTML+= `Holaaa`;
  	for (var i = 0; i < datas.length; i++){ 
  		
	btnRegreso.innerHTML += `<a href="/html/plataforma-para-que-usen-instructores.html?instructor=${datas[i].id}" type="button" class="btn btn-dark">Regresar a plataforma</a>`;
 	}
    })


});