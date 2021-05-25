let cuantosAlumnos=0; 
document.addEventListener("DOMContentLoaded", () => { 
const params = new URLSearchParams(window.location.search);
	var queInstructor = params.get('user');

	var endpoint = "http://localhost/api/users/"+ queInstructor +"/sales"; 
	fetch(endpoint)
	.then(res=> res.json())
	    .then(datas=> { 
	    	console.log(datas);
	    	 var obtenerTotal= document.getElementById("totalVentasInstructor");
	    	 obtenerTotal.innerHTML = datas.totalSales;
	    });

	   obtenerTodosLosCursosInstructor(queInstructor);
	   obtenerDatos(queInstructor);
});
function obtenerDatos(queInstructor){
	var endpoint = "http://localhost/api/users/"+ queInstructor;
	 var insName= document.getElementById("dropdownMenuLink");
	fetch(endpoint)
	.then(res=> res.json())
	    .then(datas=> { 
	    	console.log(datas);
	    	insName.dataset.indexNumber = datas.id;
	    	insName.innerHTML= `${datas.name}`;
	    });
}

iraInterfazEstudiante.addEventListener('click', function(e){ 
	var ID = dropdownMenuLink.getAttribute("data-index-number");
	window.location.href = "/html/sesion-iniciada-de-alumno.html"+ "?user=" + ID;
});

btnCerrarSesion.addEventListener('click', function(e){ 
	e.preventDefault(); 
var endpointCerrarSesion = "http://localhost/api/session";

fetch(endpointCerrarSesion, {
	    method: 'DELETE'

	}) .then(resultado => {

	window.location.href = "/html/index.html";
	resultado.json()
	})
});
function obtenerTodosLosCursosInstructor(queInstructor){
	var endpoint = "http://localhost/api/users/"+ queInstructor +"/courses?public=true"
	fetch(endpoint)
	.then(res=> res.json())
	    .then(datas=> { 
	    	console.log(datas);
	    	for (var i = 0; i < datas.length; i++){  

	    	getCoursesUsers(datas[i].id);
	    	}

	    });
}
function getCoursesUsers(queCurso){

	var endpoint = "http://localhost/api/courses/" + queCurso + "/users";
	fetch(endpoint)
	.then(res=> res.json())
	.then(datas=> { 
	   
		for (var i = 0; i < datas.length; i++){ 
			sumarAlumnos(datas.length);
			console.log(datas.length);
			var porcentaje= datas[i].completionRate * 100;
			var insertaAlu = document.getElementById("insertarAlumnos");
			insertaAlu.innerHTML += `
			<tr>
	            <th scope="row">${i + 1}</th>
	            <td>${datas[i].username}</td>
	            <td>${datas[i].enrollDate}</td>
	            <td>
	            <div class="progress-bar" role="progressbar" style="width: ${porcentaje}%;" aria-valuenow=" ${porcentaje}" aria-valuemin="0" aria-valuemax="100">${porcentaje}%</div>
                       
                      </div>
	            </td>
            </tr>
			 `;
			 console.log(" dentro de getCourses " + datas[i].username); 
		}
	});
}

function sumarAlumnos(suma){
	
	cuantosAlumnos = suma + cuantosAlumnos;

	var insertaNumAlu = document.getElementById("totalAlumnos");
	insertaNumAlu.innerHTML = `${cuantosAlumnos}` ;
	return cuantosAlumnos;
}