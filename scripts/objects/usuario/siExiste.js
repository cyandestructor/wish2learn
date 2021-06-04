

formularioIniciarSesion.addEventListener('submit', function(e){ 
 e.preventDefault(); 

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
})
function siExiste(email){
	
}
/*
export default function enviarCorreo(mail){
return mail;
}*/