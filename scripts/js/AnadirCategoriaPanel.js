/*function anadirCategoria(a) {
    var vari = document.getElementById('escondercategorias');
    vari.style.display = 'block';
    vari.style.padding = '20px';
}
function eliminarCategoria(a) {
    var vari = document.getElementById('eliminarCategoria');
    vari.style.display = 'block';
    vari.style.padding = '20px';
}*/
function verEditarCategoria(a){
    var vari = document.getElementById('escondercategorias');
    vari.style.display = 'block';
    vari.style.padding = '20px';
    var endpoint2 = 'http://localhost/api/categories?count=10&page=1';
    var cualCombobox = document.getElementById('categoriasDB');
    var cualValor = cualCombobox.value;

    fetch(endpoint2)
        .then((res) => res.json())
        .then((categories) => {
            categories.forEach((category) => {
                if (category.name == cualValor) {
                    const userNameDB =
                        document.querySelector('#categoriaInput');
                    userNameDB.setAttribute('value', category.name);
                    console.log(category.id);
                    console.log(category.name);
                    console.log(category.description);
                }
            });
            // console.log(categories);
        });
}
//Sirve para saber la opcion que selecciono el usuario para eliminar o editar

/*
function categoriaSeleccionada(a) {
    var vari = document.getElementById('escondercategorias');
    vari.style.display = 'block';
    vari.style.padding = '20px';
    var endpoint2 = 'http://localhost/api/categories?count=10&page=1';
    var cualCombobox = document.getElementById('categoriasDB');
    var cualValor = cualCombobox.value;

    fetch(endpoint2)
        .then((res) => res.json())
        .then((categories) => {
            categories.forEach((category) => {
                if (category.name == cualValor) {
                    console.log(category.id);
                    console.log(category.name);
                    console.log(category.description);

                    editarCategoria(
                        category.id,
                        category.name,
                        category.description
                    );
                }
            });
            // console.log(categories);
        });
}
*/
import Utility from '../Utility.js';
function editarCategoria(idCategoria, nombreCategoria, DescriptionCat) {
    var endpointEditar = 'http://localhost/api/categories/' + idCategoria;
    var formulario = document.getElementById('addCategoryForm');
    const categoryInfo = Utility.formDataToObject(new FormData(formulario));
    fetch(endpointEditar, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryInfo),
    }).then((response) => {
        console.log(categoryInfo);
        // Display success message / Mostrar mensaje de éxito
        if (response.ok) {
            // Display success message / Mostrar mensaje de éxito
            // Utility.displayMessage('msjCategoryAdd', 'User registered');
            form.reset();
            // Utility.displayErrors("msjCategoryAdd", null);
            return;
        }

        // Se puede realizar una acción de acuerdo al código de respuesta (response.status)
        alert('Something failed');
    });
}
