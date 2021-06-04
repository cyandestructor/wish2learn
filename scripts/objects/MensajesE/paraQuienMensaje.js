import Utility from "/scripts/Utility.js";
crearMensaje.addEventListener('submit', function(e){ 
 e.preventDefault(); 
var obtenerReceptor = document.getElementById('usernameReceptor').value;
const form = e.target;
    const userInfo = Utility.formDataToObject(new FormData(form));
	var endpoint = "http://localhost/api/users?username=" + obtenerReceptor + "&email=" + obtenerReceptor ;

fetch(endpointFinal,{
    method: 'GET',
    body:JSON.stringify(userInfo),
    headers: {
        "Content-Type": "application/json",
      }
    })
	.then(response =>{
	    	if(response.ok){
	    		alert("todo esta OK");
	    	}
	    	return response.json();
	    })
	    .then(datas=> { 
	    	console.log(datas);

	    })
	

})