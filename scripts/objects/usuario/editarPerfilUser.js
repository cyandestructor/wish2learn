

import Utility from "/scripts/Utility.js";
document.addEventListener("DOMContentLoaded", () => { 


const setIdDb = document.querySelector("#btnActualizarPerfil");
const setAvatarIdDb = document.querySelector("#uploadAvatar");

var endpointSesion = "http://localhost/api/session";
fetch(endpointSesion)
	    .then(response =>{
	    	if(response.ok){
	    		//alert("todo esta OK");
	    	}
	    	return response.json();
	    }) 
	    .then(datas=> { 
	    	
	    setIdDb.dataset.indexNumber = datas.id;
        setAvatarIdDb.dataset.indexNumber = datas.id;
      
	    saberID(datas.id);

	    });

	
})
//import enviarCorreo from '/scripts/objects/loginUser.js';
function saberID(ID){
	console.log(ID);

	var endpointEditar = "http://localhost/api/users/";
	var endpointEditarF = endpointEditar + ID;
	var descripcion = document.getElementById('descripcionDB');
	var nameUsr = document.getElementById('nameUserDBinsert');
	var lastname = document.getElementById('lastNameUserDBinsert');
	var userName = document.getElementById('userNameDBinsert');

	fetch(endpointEditarF)
	.then(response =>{
	    	if(response.ok){
	    		//alert("todo esta OK");
	    	}
	    	return response.json();
	    }) 
	    .then(datas=> { 
	    	console.log(datas);
	    	if(datas.descripcion == null){

	    	}else{
	    	 descripcion.innerHTML=  `${datas.descripcion}`;
	    	}
			nameUsr.setAttribute("value", datas.name);
			lastname.setAttribute("value", datas.lastname);
			userName.setAttribute("value",    datas.username);


		
	    	//Cargo todo lo del user en la pagina
	    });
}
/*

guardarAvatar.addEventListener('submit', function (e) { 
e.preventDefault(); 
var obtenerID = document.getElementById('btnGuardarAvatar');
var ID = obtenerID.getAttribute("data-index-number");

const form = e.target;
const avatarUser = Utility.formDataToObject(new FormData(form));

var endpointAvatar = "http://localhost/api/users/" 
var endpointFinal = endpointAvatar + ID + "/avatar";

fetch(endpointFinal,{
    method: 'PUT',
    body:JSON.stringify(ID),
    headers: {
        "Content-Type": "application/json",
      }
    })
 .then(response =>{
 	console.log(response)
	    	if(response.ok){
	    		//alert("todo esta OK");
	    	}
	    	return response.json();
	    }) 
	    .then(datas=> { 
	    	
	    alert("foto subida con éxito")

	    });
})
*/