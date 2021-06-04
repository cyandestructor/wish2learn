document.addEventListener("DOMContentLoaded", () => {
 
  var endpointSesion = "http://localhost/api/session";
  fetch(endpointSesion)
  .then(res=> res.json())
  .then(datas=> { 
  	convertirInstructor(datas.id);
	});
	   
});

function convertirInstructor(id){
	var endpoint = "http://localhost/api/users/" + id;
	var data = {"role": 2 };
	fetch(endpoint,{
    method: 'PUT',
    body:JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
      }
    })
     .then(response =>{
    if(response.ok){
	    		//alert("todo esta OK");
	    	}
	    	return response.json();
	    }) 
  .then(datas=> { 
  	console.log(datas);
  	//alert("Ahora eres un instructor");
  	window.location.href = "/html/plataforma-para-que-usen-instructores.html"+ "?user=" + id;
	});
}