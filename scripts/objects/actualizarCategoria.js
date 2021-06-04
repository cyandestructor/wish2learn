import Utility from "../Utility.js";
editCategoryForm.addEventListener('submit', function(e){ 
alert("entro al actualizar");
//como lehago para salir al id

 e.preventDefault(); 
 	var obtenerID = document.getElementById("editarCategoriaBtn");
	var ID = obtenerID.getAttribute("data-index-number");
	//obtenerId.dataset.indexNumber
	var avisos = document.getElementById("msjCategoryAdd");
 	var endpoint1 = "http://localhost/api/categories/" + ID;
 	alert(endpoint1);
    const form = e.target;
    const categoryInfo = Utility.formDataToObject(new FormData(form));
    
    fetch(endpoint1, {
    method: 'PUT',
    body:JSON.stringify(categoryInfo),
    headers: {
        "Content-Type": "application/json",
      }
    })
    .then(function(response) {
      response.json();
      form.reset();
       //return 
    })
    .then(function(data) {
       //alert("Se ha agregado exitosamente");
       avisos.innerHTML += ` 
       <br>
        <div class="alert alert-success" role="alert">
          Categoria agregada, Regresa a ELIGE UNA CATEGORÍA, ultima opción
        </div>
       `;
    })
})