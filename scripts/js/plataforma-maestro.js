$(document).ready(function () {
  $("#sidebarCollapse").on("click", function () {
    $("#sidebar").toggleClass("active");
  });
});

function showCard() {
  var data = `
  <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`;

  document.getElementById("agregando").innerHTML = data;
}
var contador = 0;

var division = document.getElementById("agregando");

function crearmascards(a) {
  var contenido = "hola";
  contador++;

  numeracion = contador + 1;
  var iddd = contador;
  var divNota = document.createElement("div");
  divNota.setAttribute("id", iddd);
  divNota.setAttribute("class", "tags");
  division.appendChild(divNota);
  divNota.textContent = contenido;
  /*
  var fruta = "agregando";
  alert(fruta);
  var resu  =  fruta+contador;
  alert(resu); */
  const myCard = document.getElementById("agregando");

  /*myCard.innerHTML=`*/
  myCard.lastChild.innerHTML =
    `
 <div class="card container">
 <div onmouseover="myOverFunction()" onmouseout="myOutOverFunction()" class="card-body">
   <h5 class="card-title">Sección ` +
    numeracion +
    `</h5>
   <input class="form-control" id="pruebaplace" type="text" placeholder="Introduccion">
   <div class="displayagregar">
     <div class="agregarmas isloaded">
       <button class="btn btn-info" onclick="nuevovalor()"><i class="bi bi-pencil-square"></i></button> 
       <button class="btn btn-info" onclick="borrarvalor()"><i class="bi bi-trash"></i></button>
       <button class="btn btn-info" onclick="desplegardescrip()"><i class="bi bi-caret-down-fill"></i></button>
     </div>
   </div>
   <br>
   <ul id="descripciondesplegar" class="list-group list-group-flush">
    <!-- <li class="list-group-item">Descripción</li>-->
     <div class="form-group">
         <label for="exampleFormControlTextarea1">Describe esta sección</label>
         <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
     </div>
       
         <!-- MENU PESTAÑAS-->
     <ul class="nav nav-tabs" id="myTab" role="tablist">
         <li class="nav-item">
         <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Archivo descargable</a>
         </li>
         <li class="nav-item">
         <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Recurso externo</a>
         </li>
     
     </ul>
     <div class="tab-content" id="myTabContent">
         <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
             
             <label class="form-label" for="customFile">Default file input example</label>
             <input type="file" class="form-control" id="customFile" />
         </div>
         <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
             <form>
                 <div class="form-row">
                     <div class="form-group">
                         <label for="inputAddress">Título</label>
                         <input type="text" class="form-control" id="inputTitle" placeholder="Conceptos básicos">
                       </div>
                       <div class="form-group">
                         <label for="inputAddress2">URL</label>
                         <input type="text" class="form-control" id="inputAddress2" placeholder="youtube.com">
                       </div>
                       <button class="btn btn-info">Añadir enlace</button>
                 </div>
             </form>
         </div>
     </div>
     <!--AQUI TERMINA MENU PESTAÑAS-->
     <br>
     <button class="btn btn-info">Guardar</button>
     <button type="button" onclick="canceldesplegardescrip()" class="btn btn-warning">Cancelar</button>
     <br>
   </ul>
   <br>
   <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
   <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
   <a href="#" class="card-link">Card link</a>
   <a href="#" class="card-link">Another link</a>
 </div>
</div>
`;
  /*const  ultimo= document.getElementById('introduccion').lastChild;*/

  /* 
var temp= document.createElement('h1');
var newContent = document.createTextNode('Hola!¿Qué tal?');
temp.appendChild(newContent);
var capa = document.getElementById('agregando');
capa.innerHTML = newContent;
*/
  /*
var temp= document.createElement('h1');
var node = document.createTextNode('This is new.');
temp.appendChild(node);

var element = document.getElementById('agregando');
element.appendChild(temp);
*/
  /*
const myCard = document.getElementById( 'agregando' );
var div = document.createElement('div');
div.setAttribute('class', 'post block');
div.innerHTML = `
  <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
  </div>
`;
document.getElementById('agregando').appendChild(div);
*/
}

function nuevovalor() {
  let input = document.getElementById("pruebaplace");

  // Obtener el valor del placeholder
  let placeholder = input.placeholder;

  // Establecer un nuevo valor
  //input.placeholder = "Aquí el nuevo valor para el placeholder";
  input.value = "Aquí";
}
function borrarvalor() {
  let input = document.getElementById("pruebaplace");

  // Obtener el valor del placeholder
  let placeholder = input.placeholder;

  // Establecer un nuevo valor
  //input.placeholder = "Aquí el nuevo valor para el placeholder";
  input.value = "";
}
function desplegardescrip() {
  let desple = document.getElementById("descripciondesplegar");
  desple.style.display = "block";
}

function canceldesplegardescrip() {
  let desple2 = document.getElementById("descripciondesplegar");
  desple2.style.display = "none";
}

function desactivarActive() {
  var m = document.getElementsById("v-pills-profile-tab");
  m.setAttribute("class", "nav-link");
  document.getElementById("v-pills-profile-tab").className = "nav-link";

  var m2 = document.getElementsById("v-pills-home-tab");
  m2.setAttribute("class", "nav-link");
}
function myOverFunction() {
  var m = document.getElementsByClassName("agregarmas");
  var n;
  for (n = 0; n < m.length; n++) {
    m[n].style.WebkitTransition = "opacity 1s";
    m[n].style.visibility = "visible";
    m[n].style.opacity = "100";
    m[n].style.display = "block";
  }
}

function myOutOverFunction() {
  var m = document.getElementsByClassName("agregarmas");
  var n;
  for (n = 0; n < m.length; n++) {
    m[n].style.transition = "1s";
    this.animationDelay + 20;
    m[n].style.visibility = "hidden";
    m[n].style.opacity = "0";
    m[n].style.display = "none";
  }
}

function openNavOriginal() {
  demoId = document.getElementById("v-pills-home-tab");
  demoId.innerHTML = `<i class="bi bi-file-earmark-slides flexc"></i><span class="textside prueba33">Cursos</span>`;

  demoId2 = document.getElementById("v-pills-profile-tab");
  demoId2.innerHTML = `<i class="bi bi-chat-dots flexc"></i><span class="textside prueba33">Comunicación</span>`;

  demoId3 = document.getElementById("v-pills-messages-tab");
  demoId3.innerHTML = ` <i class="bi bi-bar-chart-line flexc"></i><span class="textside prueba33">Rendimiento</span>`;

  demoId4 = document.getElementById("v-pills-settings-tab");
  demoId4.innerHTML = ` <i class="bi bi-tools flexc"></i><span class="textside prueba33">Herramientas</span>`;

  document.getElementById("mySidenav").style.width = "26%";
  document.getElementById("main").style.marginLeft = "26%";
  var x = document.getElementsByClassName("prueba22");
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "inline";
  }

  var y = document.getElementsByClassName("last-wrapper");
  var j;
  for (j = 0; j < y.length; j++) {
    y[j].style.maxWidth = "100%";
    y[j].style.transition = "3s";
  }
  var g = document.getElementsByClassName("last-wrapper2");
  var h;
  for (h = 0; h < g.length; h++) {
    g[h].style.maxWidth = "100%";
    g[h].style.transition = "3s";
  }
  var e = document.getElementsByClassName("prueba33");
  var f;
  for (e = 0; e < f.length; e++) {
    e[f].style.display = "inline";
  }
}

function closeNavOriginal() {
  demoId = document.getElementById("v-pills-home-tab");
  demoId.innerHTML = `<i class="bi bi-file-earmark-slides flexc"></i>`;

  demoId2 = document.getElementById("v-pills-profile-tab");
  demoId2.innerHTML = `<i class="bi bi-chat-dots flexc"></i>`;

  demoId3 = document.getElementById("v-pills-messages-tab");
  demoId3.innerHTML = ` <i class="bi bi-bar-chart-line flexc"></i> `;

  demoId4 = document.getElementById("v-pills-settings-tab");
  demoId4.innerHTML = ` <i class="bi bi-tools flexc"></i>`;

  document.getElementById("mySidenav").style.width = "9%";
  document.getElementById("main").style.marginLeft = "9%";
  var y = document.getElementsByClassName("last-wrapper");
  var j;
  for (j = 0; j < y.length; j++) {
    y[j].style.maxWidth = "0";
    y[j].style.transition = ".5s";
    y[j].style.overflow = "hidden";
  }
  var x = document.getElementsByClassName("prueba22");
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  var g = document.getElementsByClassName("last-wrapper2");
  var h;
  for (h = 0; h < g.length; h++) {
    g[h].style.maxWidth = "100%";
    g[h].style.transition = ".5s";
    g[h].style.overflow = "hidden";
  }
  var e = document.getElementsByClassName("prueba33");
  var f;
  for (e = 0; e < f.length; e++) {
    e[f].style.display = "none";
  }
}

function openNav() {
  demoId = document.getElementById("v-pills-home-tab");
  demoId.innerHTML = `<span class="textside prueba33">Tema #2</span>`;

  demoId2 = document.getElementById("v-pills-profile-tab");
  demoId2.innerHTML = `<span class="textside prueba33">Tema #3</span>`;

  demoId3 = document.getElementById("v-pills-home-tab");
  demoId3.innerHTML = `<span class="textside prueba33">Subtema #3</span>`;

  document.getElementById("mySidenav").style.width = "26%";
  document.getElementById("main").style.marginLeft = "26%";
  var x = document.getElementsByClassName("prueba22");
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "inline";
  }

  var y = document.getElementsByClassName("last-wrapper");
  var j;
  for (j = 0; j < y.length; j++) {
    y[j].style.maxWidth = "100%";
    y[j].style.transition = "3s";
  }
  var g = document.getElementsByClassName("last-wrapper2");
  var h;
  for (h = 0; h < g.length; h++) {
    g[h].style.maxWidth = "100%";
    g[h].style.transition = "3s";
  }
  var e = document.getElementsByClassName("prueba33");
  var f;
  for (e = 0; e < f.length; e++) {
    e[f].style.display = "inline";
  }
  var d = document.getElementsByClassName("panel-group");
  var f;
  for (f = 0; f < d.length; f++) {
    d[f].style.display = "inline";
  }
}

function closeNav() {
  demoId = document.getElementById("v-pills-home-tab");
  demoId.innerHTML = `<i class="bi bi-file-earmark-slides flexc"></i>`;

  demoId2 = document.getElementById("v-pills-profile-tab");
  demoId2.innerHTML = `<i class="bi bi-chat-dots flexc"></i>`;

  document.getElementById("mySidenav").style.width = "9%";
  document.getElementById("main").style.marginLeft = "9%";
  var y = document.getElementsByClassName("last-wrapper");
  var j;
  for (j = 0; j < y.length; j++) {
    y[j].style.maxWidth = "0";
    y[j].style.transition = ".5s";
    y[j].style.overflow = "hidden";
  }
  var x = document.getElementsByClassName("prueba22");
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  var g = document.getElementsByClassName("last-wrapper2");
  var h;
  for (h = 0; h < g.length; h++) {
    g[h].style.maxWidth = "100%";
    g[h].style.transition = ".5s";
    g[h].style.overflow = "hidden";
  }
  var e = document.getElementsByClassName("prueba33");
  var f;
  for (e = 0; e < f.length; e++) {
    e[f].style.display = "none";
  }
  var d = document.getElementsByClassName("panel-group");
  var s;
  for (s = 0; s < d.length; s++) {
    d[s].style.display = "none";
  }
}

/* VALIDACIONES */

function validarfor() {
  var correo = document.getElementById("mail").value;
  var nom = document.getElementsByName("nombres")[0].value;
  var rs = document.getElementsByName("razonsocial")[0].value;
  var tel = document.getElementsByName("telefono")[0].value;
  var cel = document.getElementsByName("celular")[0].value;
  var coment = document.getElementsByName("comentarios")[0].value;

  var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!expr.test(correo)) {
    //COMPRUEBA MAIL
    alert("Error: La dirección de correo " + correo + " es incorrecta.");
    return false;
  }

  if (
    correo == "" ||
    nom == "" ||
    rs == "" ||
    tel == "" ||
    cel == "" ||
    coment == ""
  ) {
    //COMPRUEBA CAMPOS VACIOS
    alert("Los campos no pueden quedar vacios");
    return false;
  }
}

function validarBuscar() {
  var buscar = document.getElementById("busqueda").value;

  for (var i = 0; i <= buscar.length; i++) {
    if (
      buscar.value == null ||
      buscar.value.length == 0 ||
      buscar.value == "" ||
      /^\s*$/.test(buscar.value)
    ) {
      alert(" no puede estar vacío o contener sólo espacios en blanco");
    }
  }
}
function validarCorreo() {
  var buscar2 = document.getElementById("exampleInputEmail1").value;
  alert(buscar2.length + " tamaño");
  for (var i = 0; i <= buscar2.length; i++) {
    if (
      buscar2.value == null ||
      buscar2.value.length == 0 ||
      buscar2.value == "" ||
      /^\s*$/.test(buscar2.value)
    ) {
      alert(
        "El correo no puede estar vacío o contener sólo espacios en blanco"
      );
    }
  }
}

/*document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("sesionin").addEventListener('submit', validarFormulario); 
});
*/
function validarFormulario(evento) {
  evento.preventDefault();
  /*var usuario = document.getElementById('exampleInputEmail1').value;
  if(usuario.length == 0) {
    alert('No has escrito nada en el usuario');
    return;
  } */
  var clave = document.getElementById("contrasInSesion").value;
  if (clave.length < 7) {
    alert("La clave no es válida");
    return;
  }
  this.submit();
}
function validarIniSesion() {
  /*
    var noentrar = false;
    var validarContra = document.getElementById('contrasInSesion').value ;
    var regex = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
    for (var i=0; i<=validarContra.length; i++) {
      if (validarContra.value == null || validarContra.value.length == 0 || validarContra.value == "" || /^\s*$/.test(validarContra.value)){

      alert (' no puede estar vacío o contener sólo espacios en blanco');
          noentrar = true;
        }      
      } 
      if(noentrar==false){
        if (regex.test(validarContra)) {
          alert (' CUMPLE');
        } else {
          alert ('NOOOO CUMPLE');
        }
      }
      */
  var validarCorreo = document.getElementById("exampleInputEmail1").value;
  var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{1,4})+$/;

  /*if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{3,4})+$/.test(validarCorreo)){
        alert("La dirección de email " + valor + " es correcta.");
       } else {
        alert("La dirección de email es incorrecta.");
       } */

  if (!expr.test(validarCorreo)) {
    //COMPRUEBA MAIL
    alert("Error: La dirección de correo " + correo + " es incorrecta.");
    return false;
  }
  alert(validarCorreo.value + " estobae");
  /* || /^\s*$/.test(validarCorreo.value */
  if (
    validarCorreo.value == null ||
    validarCorreo.value.length == 0 ||
    validarCorreo.value == "" ||
    /^\s*$/.test(validarCorreo.value)
  ) {
    alert(
      validarCorreo.value +
        " no puede estar vacío o contener sólo espacios en blanco"
    );
    noentrar = true;
  }

  if (noentrar == false) {
    if (expr.test(validarCorreo)) {
      alert(" CUMPLE");
    } else {
      alert("NOOOO CUMPLE");
    }
  }
}

$("#modal1").on("hidden.bs.modal", function (e) {
  // do something...
  $("#modal1 iframe").attr("src", $("#modal1 iframe").attr("src"));
});

$("#modal6").on("hidden.bs.modal", function (e) {
  // do something...
  $("#modal6 iframe").attr("src", $("#modal6 iframe").attr("src"));
});

$("#modal4").on("hidden.bs.modal", function (e) {
  // do something...
  $("#modal4 iframe").attr("src", $("#modal4 iframe").attr("src"));
});

var division2 = document.getElementById("agregandoLecciones");

function crearmaslecciones() {
  var contenido = "hola lecciones";
  contador++;
  numeracion = contador + 1;
  var iddd = contador;
  var divNota = document.createElement("div");
  divNota.setAttribute("id", iddd);
  divNota.setAttribute("class", "tags");
  division2.appendChild(divNota);
  divNota.textContent = contenido;
  /*myCard.innerHTML=`*/
  alert("Se agrego una nueva Lección");
  const myCard2 = document.getElementById("agregandoLecciones");
  myCard2.lastElementChild.innerHTML =
    `
   <div class="container-fluid fondonegro">
                  <div class="row">
                  <div class="panel-group" id="accordion` +
    iddd` ">
                    <div id="padreLecciones" class="panel panel-default">
                      <div class="panel-heading">
                        <h4 class="panel-title">
                          <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
                          DESCRIPCION</a>
                        </h4>
                      </div>
                      <div id="collapse1" class="panel-collapse collapse in">
                        <div class="card">
                          <div onmouseover="myOverFunction()" onmouseout="myOutOverFunction()" class="card-body">
                            <h5 class="card-title">Sección 1</h5>
                            <input class="form-control" id="pruebaplace" type="text" placeholder="Introduccion">
                            <div class="displayagregar">
                              <div class="agregarmas isloaded">
                                <button class="btn btn-info" onclick="nuevovalor()"><i class="bi bi-pencil-square"></i></button> 
                                <button class="btn btn-info" onclick="borrarvalor()"><i class="bi bi-trash"></i></button>
                                <button class="btn btn-info" onclick="desplegardescrip()"><i class="bi bi-caret-down-fill"></i></button>
                              </div>
                            </div>
                            <br>
                            <ul id="descripciondesplegar" class="list-group list-group-flush">
                             <!-- <li class="list-group-item">Descripción</li>-->
                              <div class="form-group">
                                  <label for="exampleFormControlTextarea1">Describe esta sección</label>
                                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                              </div>
                                
                                  <!-- MENU PESTAÑAS-->
                              <ul class="nav nav-tabs" id="myTab" role="tablist">
                                  <li class="nav-item">
                                  <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Archivo descargable</a>
                                  </li>
                                  <li class="nav-item">
                                  <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Recurso externo</a>
                                  </li>
                              
                              </ul>
                              <div class="tab-content container-fluid" id="myTabContent">
                                  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                      
                                      <label class="form-label" for="customFile">Default file input example</label>
                                      <input type="file" class="form-control" id="customFile" />
                                  </div>
                                  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                      <form>
                                          <div class="form-row">
                                              <div class="form-group">
                                                  <label for="inputAddress">Título</label>
                                                  <input type="text" class="form-control" id="inputTitle" placeholder="Conceptos básicos">
                                                </div>
                                                <div class="form-group">
                                                  <label for="inputAddress2">URL</label>
                                                  <input type="text" class="form-control" id="inputAddress2" placeholder="youtube.com">
                                                </div>
                                                <button class="btn btn-info">Añadir enlace</button>
                                          </div>
                                      </form>
                                  </div>
                              </div>
                              <!--AQUI TERMINA MENU PESTAÑAS-->
                              <br>
                              <button class="btn btn-info">Guardar</button>
                              <button type="button" onclick="canceldesplegardescrip()" class="btn btn-warning">Cancelar</button>
                              <br>
                            </ul>
                            <br>
                            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="card-link">Card link</a>
                            <a href="#" class="card-link">Another link</a>
                          </div>
                        </div>

                        <div class=""> <!--agregarmas2 -->
                          <a type="button" id="btndinamic" href="#" onclick="crearmascards(this)" class="tamanoicon btn-info"><i class="bi bi-node-plus"></i></a> 
                          <h4>Crea mas secciones</h4>
                        </div> 

                        <div id="agregando` +
    contador +
    `" class=" container-fluid" >
                          <div>
        
                          </div>
                        </div>
                      </div> <!-- FINALIZA EL DESPLEGABLE-->
                      <div id="collapse2" class="panel-collapse collapse">
                        <h2>PRUEBA</h2>
                        
                      </div>
                      <div id="collapse3" class="panel-collapse collapse">
                       
                      
                      </div>
                      
                    </div>
                  </div>
                  
                  </div>
                </div><!-- TERMINA FONDO NEGRO-->
   `;
}

var division3 = document.getElementById("accordion2");

function crearlec() {
  var contenido = "hola lecciones 2";
  contador++;
  numeracion = contador + 1;
  var iddd = contador;
  var divNota = document.createElement("div");
  divNota.setAttribute("id", iddd);
  divNota.setAttribute("class", "tags");
  division3.appendChild(divNota);
  divNota.textContent = contenido;
  /*myCard.innerHTML=`*/
  alert("Se agrego una nueva Lección");
  const myCard2 = document.getElementById("accordion2");
  myCard2.lastElementChild.innerHTML =
    `
  
     <div id="padreLecciones" class="panel panel-default jumbotron">
     <div class="panel-heading">
       <h4 class="panel-title">
       <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
       Título</a>
       <div class="form-group">
         <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Escribe algo genial">
       </div>
       </h4>
     </div>
     <div id="collapse1" class="panel-collapse collapse in">
       <div class="card">
         <div onmouseover="myOverFunction()" onmouseout="myOutOverFunction()" class="card-body">
           <h5 class="card-title">Sección 1</h5>
           <input class="form-control" id="pruebaplace" type="text" placeholder="Introduccion">
           <div class="displayagregar">
             <div class="agregarmas isloaded">
               <button class="btn btn-info" onclick="nuevovalor()"><i class="bi bi-pencil-square"></i></button> 
               <button class="btn btn-info" onclick="borrarvalor()"><i class="bi bi-trash"></i></button>
               <button class="btn btn-info" onclick="desplegardescrip()"><i class="bi bi-caret-down-fill"></i></button>
             </div>
           </div>
           <br>
           <ul id="descripciondesplegar" class="list-group list-group-flush">
            <!-- <li class="list-group-item">Descripción</li>-->
             <div class="form-group">
                 <label for="exampleFormControlTextarea1">Describe esta sección</label>
                 <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
             </div>
               
                 <!-- MENU PESTAÑAS-->
             <ul class="nav nav-tabs" id="myTab" role="tablist">
                 <li class="nav-item">
                 <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Archivo descargable</a>
                 </li>
                 <li class="nav-item">
                 <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Recurso externo</a>
                 </li>
             
             </ul>
             <div class="tab-content container-fluid" id="myTabContent">
                 <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                     
                     <label class="form-label" for="customFile">Default file input example</label>
                     <input type="file" class="form-control" id="customFile" />
                 </div>
                 <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                     <form>
                         <div class="form-row">
                             <div class="form-group">
                                 <label for="inputAddress">Título</label>
                                 <input type="text" class="form-control" id="inputTitle" placeholder="Conceptos básicos">
                               </div>
                               <div class="form-group">
                                 <label for="inputAddress2">URL</label>
                                 <input type="text" class="form-control" id="inputAddress2" placeholder="youtube.com">
                               </div>
                               <button class="btn btn-info">Añadir enlace</button>
                         </div>
                     </form>
                 </div>
             </div>
             <!--AQUI TERMINA MENU PESTAÑAS-->
             <br>
             <button class="btn btn-info">Guardar</button>
             <button type="button" onclick="canceldesplegardescrip()" class="btn btn-warning">Cancelar</button>
             <br>
           </ul>
           <br>
           <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
           <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
           <a href="#" class="card-link">Card link</a>
           <a href="#" class="card-link">Another link</a>
         </div>
       </div>

       <div class=""> <!--agregarmas2 -->
         <a type="button" id="btndinamic" href="#" onclick="crearmascards(` +
    numeracion +
    `)" class="tamanoicon btn-info"><i class="bi bi-node-plus"></i></a> 
         <h4>Crea mas secciones</h4>
       </div> 

       <div id="agregando ` +
    numeracion +
    `" class=" container-fluid" >
         <div>

         </div>
       </div>
     </div> <!-- FINALIZA EL DESPLEGABLE-->
     
     
   </div>
                    `;
}
