cerrarSesionUser.addEventListener('click', (e) => {
	e.preventDefault(); 
var endpointCerrarSesion = "http://localhost/api/session";

fetch(endpointCerrarSesion, {
	    method: 'DELETE'

	}) .then(resultado => {

	window.location.href = "/html/index.html";
	resultado.json()
	})
})
