import Utility from '../Utility.js';

function anadirCategoriaListBox(a, id) {
    var enCualComboBox = document.getElementById('categoriasDB');
    var crearItem = document.createElement('option');
    //crearItem.setAttribute("id", "categoria");
    //crearItem.setAttribute("class", "category");
    enCualComboBox.appendChild(crearItem);
    var contenidoCategoriaInput =
        document.getElementById('categoriaInput').value;
    crearItem.textContent = contenidoCategoriaInput;
    crearItem.value = id;
}

var respuestaEnviarCategoria = document.getElementById('msjCategoryAdd');

var formulario = document.getElementById('addCategoryForm');
formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    // var datos = new FormData(formulario);
    const form = e.target;
    //const categoryInfo = Utility.formDataToObject(new FormData(form));
    //console.log(datos.get('category'))
    /*fetch( 'http://localhost/api/categories', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
      },
    body:JSON.stringify(categoryInfo)
  }).then((resp) => resp.json())
   .then(function(data) {
       let info = data.name;
       console.log(info);
    })*/
    const categoryInfo = Utility.formDataToObject(new FormData(form));

    fetch('http://localhost/api/categories', {
        method: 'POST',
        body: JSON.stringify(categoryInfo),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(function (response) {
            return response.json();
            //return
        })
        .then(function (data) {
            //alert('Se ha agregado exitosamente');
            anadirCategoriaListBox(null, data.id);
            respuestaEnviarCategoria.innerHTML += ` 
       <br>
        <div class="alert alert-success" role="alert">
          Categoria agregada, Regresa a ELIGE UNA CATEGORÍA, ultima opción
        </div>
       `;
            form.reset();
        });
});

/*
then((response) => {
      console.log(categoryInfo);
     // Display success message / Mostrar mensaje de éxito
      if (response.ok) {
         
        
        return;
      }

      // Se puede realizar una acción de acuerdo al código de respuesta (response.status)
      alert("Something failed");
    }).then(data => {

       respuestaEnviarCategoria.innerHTML += ` 
        <div class="alert alert-danger" role="alert">
          Categoria agregada
        </div>
       `;
    })
*/
