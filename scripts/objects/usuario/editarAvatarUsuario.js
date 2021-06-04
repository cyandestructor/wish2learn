

import Utility from "/scripts/Utility.js";
guardarAvatar.addEventListener('submit', function (e) { 
e.preventDefault(); 


var obtenerID = document.getElementById('uploadAvatar');
var ID = obtenerID.getAttribute("data-index-number");

var obtenerInputAvatar = document.getElementById('upload');
var inputAvatar = obtenerInputAvatar.files[0];
var endpointAvatar = "http://localhost/api/users/" 
var endpointFinal = endpointAvatar + ID + "/avatar";

fetch(endpointFinal,{
    method: 'PUT',
    body: inputAvatar,
    headers: {
        "Content-Type":  inputAvatar.type,
      }
    })
 .then(response =>{
 	console.log(response)
	    	if(response.ok){
	    		alert("todo esta OK");
	    	}
	    	
	    }) 
	    .then(datas=> { 
	    	
	    alert("foto subida con éxito")

	    });
})


/*
document.addEventListener("DOMContentLoaded", () => {
var endpointPerfil = "http://localhost/api/users/";

const setIdDb = document.querySelector("#btnActualizarPerfil");
const setAvatarIdDb = document.querySelector("#btnGuardarAvatar");

var endpointSesion = "http://localhost/api/session";
fetch(endpointSesion)
	    .then(response =>{
	    	if(response.ok){
	    		//alert("todo esta OK");
	    	}
	    	return response.json();
	    }) 
	    .then(datas=> { 
	    	//alert("Este es el id que se va a guardar" +datas.id);
	    setIdDb.dataset.indexNumber = datas.id;
        setAvatarIdDb.dataset.indexNumber = datas.id;
	    

	    });
})*/