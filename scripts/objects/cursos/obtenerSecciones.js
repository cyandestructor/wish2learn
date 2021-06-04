document.addEventListener("DOMContentLoaded", () => {  

		const path = window.location.pathname;
  		const courseId = path.substr(path.lastIndexOf("/") + 1);
  		console.log(courseId);
  		var insertarTemario1 = document.getElementById('insertarTemario');
  		var endpoint = "http://localhost/api/courses/" + courseId+ "/sections";
  		fetch(endpoint)
		.then(res=> res.json())
	    .then(datas=> { 
	    	console.log("obtener secciones");
	    	console.log(datas);
	    	for (var i = 0; i < datas.length; i++){
	    		var gratis = datas[i].free;
	    		var precio=datas[i].price;
	    		if (gratis== true){
	    			gratis="gratis";
	    			
	    		}else{
	    			gratis="de paga";
	    		}
	    		if(precio == null){

	    		precio=0;
	    	}else {

	    	}
	    	console.log("el estado es " + gratis);
	    	insertarTemario1.innerHTML +=  ` 
	    	<tr>
            <th scope="row">
              
              <ul id="menu">
                <div class="col-md-8">
                  <li><input type="checkbox" name="list" id="nivel1table"><label for="nivel1table">${datas[i].title}</label>
                    <ul id="insLvl${datas[i].id}">
                    </ul>
                  </li>
                </div>
              </ul>
            </th>
            <td><a href="#">${gratis}</a> </td>
            <td>$ ${precio}</td>
          </tr>
          `;
          console.log("seccion numero ")
          obtenerLecciones(datas[i].id);
          	}
	    });
});

function obtenerLecciones(idSeccion){

	var endpoint = "http://localhost/api/sections/" + idSeccion	+ "/lessons";

	fetch(endpoint)
	.then(res=> res.json())
	    .then(datas=> { 
	    		
	    	var insertalvl = "insLvl"+ idSeccion;
	    	console.log("obteniendo lecciones");
	    	console.log(datas);
	    	for (var i = 0; i < datas.length; i++){
	    		var insertalvl = document.getElementById(insertalvl);
	    		insertalvl.innerHTML	=` 
	    	<li><input type="checkbox" name="list" id="nivel2table"><label for="nivel2table">${datas[i].title}</label>
                            
                          </li>
                          `;
	    		
	    	}

	    });
}