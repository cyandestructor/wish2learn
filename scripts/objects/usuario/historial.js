document.addEventListener("DOMContentLoaded", () => { 
 var endpointSesion = "http://localhost/api/session";
  fetch(endpointSesion)
  .then(response =>{
    if(response.ok){
	    		//alert("todo esta OK");
	  } 
	    	return response.json();
	    }) 
  .then(datas=> { 
    	cargarHistorial(datas.id, datas.username);
    })
});

 function cargarHistorial(id, nombreUsuario){
  var endpoint = "http://localhost/api/users/"+ id +"/enrollments"
  fetch(endpoint)
  .then(res=> res.json())
      .then(datas=> { 
        for (var i = 0; i < datas.length; i++){
        var historial= document.getElementById('insertaHistorial');
          historial.innerHTML = ` 
          <tr>
            <th scope="row">
                  <ul>
                    <div class="col-md-8">
                      <li>${nombreUsuario} ha comprado el curso ${datas[i].title}</label>
                        <ul class="interior">
                        </ul>
                      </li>
                    </div>
                  </ul>
                </th>
                <td> ${datas[i].enrollDate} </td>
               
              </tr>
            `;
          }
      });
  
 	
 }