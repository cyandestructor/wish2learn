

import Utility from "../Utility.js";

btnEliminarCategoria.addEventListener('click',function(e){
    var vari = document.getElementById("esconderEliminarCategoria");
    vari.style.display = 'block';
    vari.style.padding = '20px';

    var cualCombobox = document.getElementById('categoriasDB');
    var cualValor = cualCombobox.value;
    var obtenerID = document.getElementById('eliminarCategoria');
   /*  var obtenerID = document.getElementById('eliminarCategoria');
     var ID = obtenerID.getAttribute("data-index-number");
     var endpoint1 = "http://localhost/api/categories/" + ID;*/
    var endpointFinal = "http://localhost/api/categories/" + cualValor;
       const asignarInfoEliminar = document.querySelector('#infoAEliminar');
      fetch(endpointFinal)
        .then((res) => res.json())
        .then(categories => {       
        obtenerID.dataset.indexNumber = categories.id;
        asignarInfoEliminar.innerHTML += ` 
        <h6>${categories.name}</h6>
         <h6>${categories.description}</h6>
        `;
      

        });

})
eliminateCategoryForm.addEventListener('submit', function(e){ 
  e.preventDefault(); 
  alert("entro al actualizar");
//como lehago para salir al id
 
 	var obtenerID = document.getElementById("eliminarCategoria");
	let ID = obtenerID.getAttribute("data-index-number");
 	var endpoint1 = "http://localhost/api/categories/" + ID;

  var avisos = document.getElementById("msjCategoryAdd");
 	alert("en donde borrare" +endpoint1);  
    fetch(endpoint1, {
    method: 'DELETE',
    body:JSON.stringify(ID),
    headers: {
        "Content-Type": "application/json",
      }
    })
      .then(function(response) {
            debugger
                //form.reset();
              })
    .then(function(data) {

       //alert("Se ha agregado exitosamente");
       avisos.innerHTML += ` 
       <br>
       <div class="alert alert-danger" role="alert">
          Categoría eliminada
        </div>
       <br>
       
       `;
    })
})