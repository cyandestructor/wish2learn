function anadirCategoriaListBox(a) {
  var enCualComboBox = document.getElementById("inputState");
  var crearItem = document.createElement("option");
  //crearItem.setAttribute("id", "categoria");
  //crearItem.setAttribute("class", "category");
  enCualComboBox.appendChild(crearItem);
  var contenidoCategoriaInput = document.getElementById("categoriaInput").value;
  crearItem.textContent = contenidoCategoriaInput;
}
function anadirCategoria(a) {
  //let enCualLugar = a.id;
  //courseCreationForm

  let enCualLugar = "courseCreationForm";
  var insertarEn = document.getElementById(enCualLugar);

  var contenido = "Crea tu propia categoría";

  /*const myCard2 = document.getElementById("agregandosecciones" + cualbotonseccion);*/
  var crearEspacioParaInsertar = document.createElement("div");
  crearEspacioParaInsertar.setAttribute("id", "categoria");
  crearEspacioParaInsertar.setAttribute("class", "category");
  insertarEn.appendChild(crearEspacioParaInsertar);
  crearEspacioParaInsertar.textContent = contenido;

  let enCualId = "categoria";
  var anadir = document.getElementById(enCualId);
  anadir.setAttribute("class", "col-md-8 hacerinlines");
  anadir.innerHTML = `
  <br>
    <h6>Crea tu categoría</h6>
    <label for="formGroupExampleInput2" class="form-label">Nueva categoria</label>
    <input type="text" class="form-control" id="categoriaInput" placeholder="Nombre de categoría" name="category">
   <br>
    <button type="button" id="guardarCategoria" onclick="anadirCategoriaListBox(this)" class="btn btn-primary">
    Guardar categoría
  </button>
    `;

  /* let enCualLugar = "courseCreationForm";
    var anadir = document.getElementById(enCualLugar);
    anadir.setAttribute("class", "col-md-8 hacerinlines");
    anadir.innerHTML = `
      <h6>Crea tu categoria</h6>
      <label for="formGroupExampleInput2" class="form-label">Nueva categoria</label>
      <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
      `; */
}
