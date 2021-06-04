regresarPlataformaBtn.addEventListener('click', function(e){ 

  var endpointSesion = "http://localhost/api/session";

  fetch(endpointSesion)
  .then(response =>{
    if(response.ok){
	    		//alert("todo esta OK");
	    	}
	    	return response.json();
	    }) 
  .then(datas=> { 

 window.location.href = "/html/plataforma-para-que-usen-instructores.html?instructor="+ datas.id;
  });

})