document.addEventListener("DOMContentLoaded", () => {

  var endpointSesion = "http://localhost/api/session";
  let cualID;
  const chargeNameDb = document.querySelector("#chargeNameDB");
  let guardarID;

  fetch(endpointSesion)
  .then(response =>{
    if(response.ok){
	    		//alert("todo esta OK");
	    	}
	    	return response.json();
	    }) 
  .then(datas=> { 
    console.log("info session " + datas.id)
    chargeNameDb.innerHTML = ` 
    <br>
    <div class="" id="obtenerUserID" data-index-number="${datas.id}" style="display:none;">

    </div>
    `;
    cargarNameDB();
    cargarCursosDelUser(datas);
    perfilTab();
  }); 
    
})

function actualizarRB(){
   
}
function cargarCursosDelUser(data){

  var endpointEnrollments= "http://localhost/api/users/"+ data.id +"/enrollments";
  
  fetch(endpointEnrollments)
  .then(res=> res.json())
      .then(datas=> { 
        console.log(datas);

         for (var i = 0; i < datas.length; i++){ 
          var insertarCursosUser = document.getElementById('coursesEnrollment');

   var insertarCursosCompletos = document.getElementById('coursesEnrollment');
           insertarCursosUser.innerHTML += ` 
            <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <a href="/html/interfaz-curso-adquirido.html">
                <div class="card-flyer">
                  <div class="text-box">
                      <div class="image-box">
                       <!--<img src="localhost/api/courses/${data.id}/image" alt="${datas[i].title}"/>-->
                      <img src="https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jpg" alt="" />
                      </div>
                      <div class="text-container">
                      <h6 id="courseId" data-index-number="${datas[i].id}">${datas[i].title}</h6>
                      <p>${datas[i].description}</p>
                      <a id="instructorId" href="http://localhost/html/perfil_user.html?instructor=${data.id}" data-index-number="${datas[i].instructorId}">${datas[i].instructorName}</a>
                   
                      <br>
                      <div class="progress">
                      <div class="progress-bar" role="progressbar" style="width: ${datas[i].completedLessons}%;" aria-valuenow="${datas[i].completedLessons}" aria-valuemin="0" aria-valuemax="100">${datas[i].completedLessons}%</div>
                       
                      </div>
                      <div id="meterStar${datas[i].id}">
                       </div>

                       
                    </div>
                  </div>
                </div>
              </a>
              
            </div>

          

            `;
           // actualizarRB();
             if(datas[i].grade == null){
            cualgrade = 0;
           }else{
             var cualgrade = parseInt(datas[i].grade, 10);
           }
          

            if(5 == cualgrade){

              var cadena="meterStar"+ datas[i].id
               var cualStarr= document.getElementById(cadena);
               cualStarr.innerHTML +=  `
               <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
                `;
            
             }
              if(4 == cualgrade){
               
               var cadena="meterStar"+ datas[i].id
               var cualStarr= document.getElementById(cadena);
               cualStarr.innerHTML +=  `
               <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star "></span>
                `;
             } 
             if(3 == cualgrade){ 
             
                 var cadena="meterStar"+ datas[i].id
               var cualStarr= document.getElementById(cadena);
               cualStarr.innerHTML +=  `
               <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star "></span>
                `;
             }
             if(2 == cualgrade){
             
                var cadena="meterStar"+ datas[i].id
               var cualStarr= document.getElementById(cadena);
               cualStarr.innerHTML +=  `
               <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star "></span>
                `;
             }
              if(1 == cualgrade){
               
              var cadena="meterStar"+ datas[i].id
               var cualStarr= document.getElementById(cadena);
               cualStarr.innerHTML +=  `
               <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star "></span>
                `;
             }
              if(0 == cualgrade){
               
                 var cadena="meterStar"+ datas[i].id
               var cualStarr= document.getElementById(cadena);
               cualStarr.innerHTML +=  `
               <span class="fa fa-star "></span>
              <span class="fa fa-star "></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star "></span>
                `;
             }
          } //fin del for
        
      });

}

const cargaAlgo = document.getElementById('cargarAlgo');

function cargarNameDB(){
	
	let info;
	let roleperfil;
 
 const params = new URLSearchParams(window.location.search);
  
  var queInstructor = params.get('instructor');

  var endpointPerfil = "http://localhost/api/users/" + queInstructor;

  fetch(endpointPerfil)
  .then(resultado => resultado.json())
  .then(datas=> {
    var obtenerID = document.getElementById('obtenerUserID');
  var ID = obtenerID.getAttribute("data-index-number");
var imagen = document.getElementById('cargaImagen');
    console.log("este es el rol de este perfil " + datas.role);
    if(datas.role == 1){
      verInterfazAlumno();
     roleperfil = "Perfil estudiante";
   }else{
    roleperfil = "Perfil Instructor";
    verInterfazInstructor();
   }
   alert(queInstructor);
   console.log(queInstructor);
   imagen.innerHTML =  ` 
     <img src="http://localhost/api/users/${queInstructor}/avatar" alt="foto de Perfil" class="img-thumbnail" onerror="this.onerror=null;this.src='/assets/images/notUserImage.png';">
   `;
 })
}

function perfilTab(){
  
  var obtenerID = document.getElementById('obtenerUserID');
  var ID = obtenerID.getAttribute("data-index-number");
  let info;
  var roleperfil;
  var endpointPerfil = "http://localhost/api/users/" + ID;
  fetch(endpointPerfil)
  .then(resultado => resultado.json())
  .then(datas=> {
    roleperfil= datas.role;
    if(roleperfil == 1){
      roleperfil = "Perfil estudiante";
    }else{
      roleperfil = "Perfil maestro";
    }

        //Cargar nombre de usuario

        const nameUserDB = document.querySelector('#nameUserDBinsert');
        nameUserDB.setAttribute("value",    datas.name );
        //apellido
        const lastNameUserDB = document.querySelector('#lastNameUserDBinsert');
        lastNameUserDB.setAttribute("value",    datas.lastname);
        //nombre de usuario
        const userNameDB = document.querySelector('#userNameDBinsert');
        userNameDB.setAttribute("value",    datas.username );
        //email
     //   const emailDB = document.querySelector('#emailDBinsert');
      //  emailDB.setAttribute("value",    datas.user_email );
        //descripcion
        // const emailDB = document.querySelector('#emailDBinsert');
        //emailDB.setAttribute("value",    datas.user_email );
        //
        // const nameUserDB = document.querySelector('#nameUserDBinsert');
        //nameUserDB.setAttribute("value",    datas.name );
        var descripcion = datas.description;
        const descripDB = document.querySelector('#descripcionDB');
        if( descripcion == null ){
          descripcion = "Necesitas añadir una descripción";
        }
        descripDB.innerHTML = descripcion;
        const roleDB = document.querySelector('#actualRolDB');
        roleDB.setAttribute("value", roleperfil );

        const fechaActividad = document.querySelector('#fechaActividad');
        fechaActividad.setAttribute("value", datas.lastChangeDate );
       /* info = ` 
    
                  <h4>Empecemos a aprender, ${datas.name} <br> ${datas.lastname}</h4>
                  <h4 id="roleUserDB">${roleperfil}</h4>
            `;
        
        comboBox.appendChild(item);
        chargeNameDB.innerHTML= info;*/
      })
}

/*  +++++++++++++++++++++++++++++++++++ INTERFAZ ++++++++++++++++++++++++++++++++++ */
function verInterfazInstructor() {
  var plataforma = (document.getElementById("plataforma").style.display = "block");
 
}
function verInterfazAlumno(){
 var convierteInstructor = (document.getElementById("convierteInstructor").style.display = "block");
}
/*
              var entero = parseInt(datas[i].grade, 10);
              var generarId = "star" + entero + datas[i].id ;
              console.log(generarId);
             var cualStarr= document.getElementById(generarId);
            
             //cualStarr.click();
             //cualStarr.setAttribute("checked");
             //document.getElementById(generarId).checked = true;
              cualStarr.setAttribute("checked");*/