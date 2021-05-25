import Utility from "../Utility.js";

formularioIniciarSesion.addEventListener('submit', function(e){ 
 e.preventDefault(); 

	const form = e.target;
    const userInfo = Utility.formDataToObject(new FormData(form));
	var avisos = document.getElementById("msjCategoryAdd");
	var endpoint = "http://localhost/api/session";
	 var avisos = document.getElementById('exampleInputEmail1').value;
	
	//siExiste(email);
	  fetch(endpoint, {
	    method: 'PUT',
	    body:JSON.stringify(userInfo),
	    headers: {
	        "Content-Type": "application/json",
	      }
	    })
	    .then(function(response) {
	    	//hacer aqui el redirect
			

	    	window.location.href = "/html/sesion-iniciada-de-alumno.html";

	    	form.reset();
	      
	      return response.json();
	    })
	    .then(function(data) {
	       //alert("Se ha agregado exitosamente");
			
	       avisos.innerHTML += ` 
	       <br>
	        <div class="alert alert-success" role="alert">
	          Seras redirigido
	        </div>
	       `;

	    }) 
})
function siExiste(email){
	email = document.getElementById('exampleInputEmail1').value;
	// data = { "email" ,email };
	 var endpoint = "http://localhost/api/users?username=tester&email=" + email;

	 fetch(endpoint)
	.then(response =>{
	    	if(response == 200){
	    		alert("ya existe el usuario");
	    	}
	    	return response.json();
	    })
	    .then(datas=> { 
	    	console.log(datas);
	    	coursesRecently(datas);
	    });
}
/*
export default function enviarCorreo(mail){
return mail;
}*/