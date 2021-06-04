let numeroSecciones= 0;
document.addEventListener("DOMContentLoaded", () => { 
console.log("SE ABRE el progreso");
		const params = new URLSearchParams(window.location.search);
	console.log(params.toString());
	var courseId = params.get('course');

  		console.log(courseId);
  	
  		var endpoint = "http://localhost/api/courses/"+ courseId +"/sections";
  		fetch(endpoint)
		.then(res=> res.json())
	    .then(datas=> { 
	    	
	    	barraprogreso(datas.length);
          	})
	    

})

  let porcentaje = 100;
  let promedio = 0 ;
function barraprogreso(numSecciones) {
	console.log("entra a barra progreso inicial");
	 porcentaje = 100;
	 promedio = porcentaje/ numSecciones;
	console.log(promedio);
  /*var div1 = document.getElementById("barraprog");
	var vervalor = div1.getAttribute("style");*/

  /*let element = document.getElementById('barraprog');
	let elementStyle = window.getComputedStyle(element);
	let elementWidth = elementStyle.getPropertyValue('width');
	alert(elementWidth); 
 		var barra= document.getElementById("barraprog");
 		barra.style.cssText = 'width:0%;';
	    barraprogreso();
	*/

  let element = document.getElementById("barraprog");
  let elementStyle = window.getComputedStyle(element);
  let elementWidth = elementStyle.getPropertyValue("width");

  let element3 = document.getElementById("barraprog");
  let element4 = (element3.style.width = "calc(" + elementWidth +" 100)");
 
}

function sumarBarra(){

	alert("holaaa");
	console.log(accion);
  let element = document.getElementById("barraprog");
  let elementStyle = window.getComputedStyle(element);
  let elementWidth = elementStyle.getPropertyValue("width");

  let element3 = document.getElementById("barraprog");
  let element4 = (element3.style.width = "calc(" + elementWidth +  promedio +")");
 
}

/*abrirProgreso.addEventListener('click', function(e){ 
console.log("entro a ver las secciones de un curso");
	    	console.log(datas);
	    	console.log(datas.length);
	    	for (var i = 0; i < datas.length; i++){
	    		 console.log(datas[i].id);
			console.log("obtener secciones");
	    	debugger
	    	console.log(datas.length);
	    	numeroSecciones = datas.length;
	    	barraprogreso(numeroSecciones);

            console.log("seccion numero ")
           // obtenerLecciones(datas[i].id);
	    			var cualAtributo = "seccionInput" + datas[i].id ;
	    			console.log("cualAtributo");
	    			console.log(cualAtributo);
	    			debugger
	    		var insertaAtributo = document.getElementById(cualAtributo);
	    		insertaAtributo.onclick	= barraprogreso();
	    		//insertaAtributo.setAttribute("onclick", "barraprogreso()");
	    		//.setAttribute("onclick", "barraprogreso()");
	    	}
 })*/