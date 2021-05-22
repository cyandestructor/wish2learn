function anadirCategoriaListBox(a) {
  var enCualComboBox = document.getElementById("categoriasDB");
  var crearItem = document.createElement("option");
  //crearItem.setAttribute("id", "categoria");
  //crearItem.setAttribute("class", "category");
  enCualComboBox.appendChild(crearItem);
  var contenidoCategoriaInput = document.getElementById("categoriaInput").value;
  crearItem.textContent = contenidoCategoriaInput;
}
function anadirCategoria(a) {
  var vari = document.getElementById('escondercategorias');
  vari.style.display = "block";
}



//ignorar

  //let enCualLugar = a.id;
  //courseCreationForm

  /*let enCualLugar = "crearInterfazCategoria";
  var insertarEn = document.getElementById(enCualLugar);

  var contenido = "Crea tu propia categoría";
  alert("entre al js");*/
  /*const myCard2 = document.getElementById("agregandosecciones" + cualbotonseccion);*/
  /*var crearEspacioParaInsertar = document.createElement("div");
  crearEspacioParaInsertar.setAttribute("id", "");
  crearEspacioParaInsertar.setAttribute("class", "");
  insertarEn.appendChild(crearEspacioParaInsertar);
  crearEspacioParaInsertar.textContent = contenido;
*//*
  let enCualId = "crearInterfazCategoria";
  var anadir = document.getElementById(enCualId);
  anadir.setAttribute("class", "col-md-8 hacerinlines");
  //<form class="row g-3 formularioregistro" id="addCategoryForm">
  anadir.innerHTML = `
                  
                      <h6>Crea tu categoría</h6>
                      <label for="formGroupExampleInput2" class="form-label">Nueva categoria</label>
                      <input type="text" class="form-control" id="categoriaInput" placeholder="Nombre de categoría" name="name">
                     <br>
                     <label for="exampleFormControlTextarea1">Añade una descripción de la categoría</label>
                      <input name="description" class="form-control" id="exampleFormControlTextarea1" rows="3"></input>
                      <br>
                      <button type="submit" id="guardarCategoria" class="btn btn-primary">
                         Guardar categoría
                      </button>
                  
    `;*/

  /* let enCualLugar = "courseCreationForm";
    var anadir = document.getElementById(enCualLugar);
    anadir.setAttribute("class", "col-md-8 hacerinlines");
    anadir.innerHTML = `
      <h6>Crea tu categoria</h6>
      <label for="formGroupExampleInput2" class="form-label">Nueva categoria</label>
      <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
      `; */