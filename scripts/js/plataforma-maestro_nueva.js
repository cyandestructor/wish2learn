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

function crearmascards() {
  var contenido = "hola";
  contador++;
  var iddd = contador;
  var divNota = document.createElement("div");
  divNota.setAttribute("id", iddd);
  divNota.setAttribute("class", "tags");
  division.appendChild(divNota);
  divNota.textContent = contenido;

  const myCard = document.getElementById("agregando");
  /*myCard.innerHTML=`*/
  myCard.lastChild.innerHTML = `
 <div class="card container">
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
function openNav() {
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
  for (f = 0; f < e.length; f++) {
    e[f].style.display = "inline";
  }
}

function closeNav() {
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
