
var page=1;
 import Utility from "../Utility.js";
var endpoint1 = "http://localhost/api/categories?count=10&page=";
var endpointFinal =  endpoint1 + page;
console.log(endpointFinal);
fetch(endpointFinal)
.then(res=> res.json())
.then(categories => {
    console.log(categories);
    consultarCategorias(categories);
})

siguienteInformacionPCC.addEventListener('click', function(e){
  e.preventDefault(); 
 var listaCategorias = document.getElementById('colocarAvisos');
       listaCategorias.innerHTML = ` `;
  page=page + 1;
  console.log(page);
  var endpoint1 = "http://localhost/api/categories?count=10&page=";
  var endpointFinal =  endpoint1 + page;

  fetch(endpointFinal)
  .then(res=> res.json())
  .then(categories => {
      console.log(categories);
      consultarCategorias(categories);

  })
  
       
});

anteriorInformacionPCC.addEventListener('click', function(e){
  e.preventDefault(); 
  var listaCategorias = document.getElementById('colocarAvisos');
       listaCategorias.innerHTML = ` `;
  if(page > 1){
     page=page - 1;
      console.log(page);
      var endpoint1 = "http://localhost/api/categories?count=10&page=";
      var endpointFinal =  endpoint1 + page;

      fetch(endpointFinal)
      .then(res=> res.json())
      .then(categories => {
          console.log(categories);
          consultarCategorias(categories);
      })
  }else{
    var listaCategorias = document.getElementById('colocarAvisos');
       listaCategorias.innerHTML += ` 
        <div class="alert alert-danger" role="alert">
         Has llegado al inicio
        </div>
       `;
    
  }
 
});

function consultarCategorias(data){
var listaCategorias = document.getElementById('colocarAvisos');
       listaCategorias.innerHTML = ` `;
   var listaCategorias = document.getElementById('categoriasDB');
   listaCategorias.innerHTML = ` `;
    if(data.length== 0){
      console.log('Ya no hay informacion');
       var errores = document.getElementById('colocarAvisos');
       errores.innerHTML += ` 
        <div class="alert alert-danger" role="alert">
         Has llegado al final de las categorias
        </div>
       `;
    } else {
        for (var i = 0; i < data.length; i++){
            const item = document.createElement('option');
                item.value = data[i].id;
                item.innerHTML = `
                    ${data[i].name}
                `;
                listaCategorias.appendChild(item);
         }
     } 
}


btnEditarCategoria.addEventListener('click', function (e) {
e.preventDefault(); 
    var vari = document.getElementById('escondercategorias');
    vari.style.display = 'block';
    vari.style.padding = '20px';
    
    var cualCombobox = document.getElementById('categoriasDB');
    var cualValor = cualCombobox.value;

      var endpoint1 = "http://localhost/api/categories/";
      var endpointFinal =  endpoint1 + cualCombobox.value;
   
      const nameCategoryDB = document.querySelector('#editarCategoriaInput');
      const descriptionCategoryDB = document.querySelector('#editarDescripcionInput');
      const asignarIDEditar = document.querySelector('#editarCategoriaBtn');
      const asignarIDEliminar = document.querySelector('#eliminarCategoria');
     
      fetch(endpointFinal)
        .then((res) => res.json())
        .then(categories => {       
            console.log(categories.id);
            console.log(categories.name);
            console.log(categories.description);
        asignarIDEditar.dataset.indexNumber = categories.id;
        asignarIDEditar.dataset.indexNumber = categories.id;
        nameCategoryDB.setAttribute("value",   categories.name );
        
        descriptionCategoryDB.setAttribute("value", categories.description);
        });
      console.log(asignarID.dataset.indexNumber);
})

/*var formulario1 = document.getElementById('editCategoryForm');
formulario1.addEventListener('submit', function(e){
   e.preventDefault(); 
 
    const form = e.target;
    const categoryInfo = Utility.formDataToObject(new FormData(form));
    alert( "este es el endpoint del PUT" + endpointFinal)
    fetch(endpointFinal, {
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
       respuestaEnviarCategoria.innerHTML += ` 
       <br>
        <div class="alert alert-success" role="alert">
          Categoria agregada, Regresa a ELIGE UNA CATEGORÍA, ultima opción
        </div>
       `;
    })
})*/
 /*  
function actualizarCategory(){
  alert("entra");
} */
