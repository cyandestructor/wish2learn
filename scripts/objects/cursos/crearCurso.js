import Utility from "../Utility.js";
document.addEventListener("DOMContentLoaded", () => {
 
var endpointSesion = "http://localhost/api/session";
let cualID;
const asignarIDInstructr = document.querySelector("#asignarIDInstructor");
let guardarID;

fetch(endpointSesion)
	    .then(response =>{
	    	if(response.ok){
	    		//alert("todo esta OK");
	    	}
	    	return response.json();
	    }) 
	    .then(datas=> { 
	    	
	    	asignarIDInstructr.innerHTML = datas.id;
	   
	    });

	   
})

courseCreationForm.addEventListener('submit', () => { 	
	
	var endpointCrearCurso =  "http://localhost/api/courses";
	fetch(endpointCrearCurso,{
    method: 'PUT',
    body:JSON.stringify(avatarUser),
    headers: {
        "Content-Type": "application/json",
      }
    })
	
})
