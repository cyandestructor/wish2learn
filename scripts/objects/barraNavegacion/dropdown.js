
document.addEventListener("DOMContentLoaded", () => { 
 var endpointSesion = "http://localhost/api/session";
  let cualID;
  const chargeNameDb = document.querySelector("#chargeNameDB");
  let guardarID;

  fetch(endpointSesion)
  .then(response =>{
    if(response.ok){
	    		//alert("todo esta OK");
	    	}
	    	return response.json();
	    }) 
  .then(datas=> {  
  	if(datas.role==1){

  		var dropdown = document.getElementById('cargarDropdownRole');
  		dropdown.innerHTML =  ` 	
		<li class="nav-item ">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-square" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                </svg>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link  dropdown-toggle" href="#" data-bs-toggle="dropdown"> ${datas.username} </a>
                  <ul class="dropdown-menu dropdown-menu-end">
                  <li><a class="dropdown-item" href="#"> ${datas.username} </a></li>
                
                  <div class="dropdown-divider"></div>
                  <li><a class="dropdown-item" href="#"> Mi aprendizaje </a></li>
                  <li><a class="dropdown-item " data-toggle="pill" onclick="activarPestanaMochila()" href="#mimochilacursos"> Mi mochila </a></li>
                  <div class="dropdown-divider"></div>
                  <li><a class="dropdown-item" href="#"> Mensajes </a></li>
                  <li><a class="dropdown-item" href="/html/editar-perfil-alumno.html"> Editar Perfil </a></li>
                  <div class="dropdown-divider"></div>
                  <li><a class="dropdown-item" href="/html/historial.html"> Historial </a></li>
                  <div class="dropdown-divider"></div>
                  <li>
                    <a class="dropdown-item" href="#" id="cerrarSesionUser"> Cerrar sesión </a>
                  </li>
                  </ul>
              </li>
		`;
  	} else {
  			var dropdown = document.getElementById('cargarDropdownRole');
  		dropdown.innerHTML =  ` 
  		<li class="nav-item ">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-square" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                </svg>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link  dropdown-toggle" href="#" data-bs-toggle="dropdown"> ${datas.username} </a>
                  <ul class="dropdown-menu dropdown-menu-end">
                  <li><a class="dropdown-item" href="#"> ${datas.username} </a></li>
                
                  <div class="dropdown-divider"></div>
                  <li><a class="dropdown-item" href="#"> Mi aprendizaje </a></li>
                  <li><a class="dropdown-item " data-toggle="pill" onclick="activarPestanaMochila()" href="#mimochilacursos"> Mi mochila </a></li>
                  <div class="dropdown-divider"></div>
                  <li><a class="dropdown-item" href="/html/mailbox.html"> Mensajes </a></li>
                  <li><a class="dropdown-item" href="/html/perfil.html"> Editar Perfil </a></li>
                  <div class="dropdown-divider"></div>
                  
                  <li><a class="dropdown-item" href="/html/plataforma-para-que-usen-instructores.html?instructor=${datas.id}"> Plataforma para maestros</a></li>
                  <div class="dropdown-divider"></div>
                  <li><a class="dropdown-item" href="#"> Cerrar sesión </a></li>
                  </ul>
              </li>
              `;
  	}


  }) 

});