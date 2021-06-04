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
    console.log("info session " + datas)
    chargeNameDb.innerHTML = ` 
    <br>
    <div class="" id="obtenerUserID" data-index-number="${datas.id}" style="display:none;">

    </div>
    `;
    console.log(datas.role);
    if(datas.role ==2){
        var obtenerPlata= document.getElementById('plataforma');
      obtenerPlata.innerHTML +=  `<a id="asignarIdInstr" class="nav-link" href="/html/plataforma-para-que-usen-instructores.html?instructor=`+ datas.id +` >Plataforma para maestros</a>
       `;
    }

    cargarNameDB();
    cargarCursosDelUser(datas);
  });
//document.getElementById("star5").checked = true;
/*$("input[type='radio']").click(function(){
  var sim = $("input[type='radio']:checked").val();
  
  //alert(sim);
    if (sim<3) { 
      $('.myratings').css('color','red');
       $(".myratings").text(sim); }
    else{ 
        $('.myratings').css('color','green'); 
        $(".myratings").text(sim); 
      } 
    }); */
 

})

function actualizarRB(){
   
}
function cargarCursosDelUser(data){

  var endpointEnrollments= "http://localhost/api/users/"+ data.id +"/enrollments";
  
   var insertarCursosCompletos = document.getElementById('cargarCursosCompletados');
  fetch(endpointEnrollments)
  .then(res=> res.json())
      .then(datas=> { 
        console.log(datas);

         for (var i = 0; i < datas.length; i++){ 
          var insertarCursosUser = document.getElementById('coursesEnrollment');

           insertarCursosUser.innerHTML += ` 
            <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <a href="/html/watch-course.html?course=${datas[i].id}&user=${data.id}">
                <div class="card-flyer">
                  <div class="text-box">
                      <div class="image-box">
                       <img src="http://localhost/api/courses/${data.id}/image" alt="${datas[i].title}" onerror="this.onerror=null;this.src='/assets/images/notUserImage.png';">
                     <!-- <img src="https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jpg" alt="" />-->
                      </div>
                      <div class="text-container">
                      <h6 id="courseId" data-index-number="${datas[i].id}">${datas[i].title}</h6>
                      <p>${datas[i].description}</p>
                      <a id="instructorId" data-index-number="${datas[i].instructorId}">${datas[i].instructorName}</a>
                      <br>
                      <div class="progress">
                      <div id="progressBar${datas[i].id}" class="progress-bar" role="progressbar" style="width: ${datas[i].completedLessons}%;" aria-valuenow="${datas[i].completedLessons}" aria-valuemin="0" aria-valuemax="100">${datas[i].completedLessons}%</div>
                       
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
        for (var i = 0; i < datas.length; i++){ 
           insertarCursosCompletos.innerHTML +=`<option value="${datas[i].id}">${datas[i].title}</option>`; 
         }
        
         
        

      });

}

const chargeNameDb = document.querySelector("#chargeNameDB");

function cargarNameDB(){
	
	let info;
	let roleperfil;
 var ID = obtenerUserID.getAttribute("data-index-number");

  var endpointPerfil = "http://localhost/api/users/" + ID;

  fetch(endpointPerfil)
  .then(resultado => resultado.json())
  .then(datas=> {
    var obtenerID = document.getElementById('obtenerUserID');
  var ID = obtenerID.getAttribute("data-index-number");

    console.log("este es el rol de este perfil " + datas.role);
    if(datas.role == 1){
      verInterfazAlumno();
     roleperfil = "Perfil estudiante";
   }else{
    roleperfil = "Perfil Instructor";
      

    verInterfazInstructor();
     var obtenerPlata= document.getElementById("plataforma");
      obtenerPlata.innerHTML +=  `<a id="asignarIdInstr" class="nav-link" href="/html/plataforma-para-que-usen-instructores.html?instructor=`+ datas.id +` >Plataforma para maestros</a>
       `;
   }
   info = ` 
   <h4>Empecemos a aprender, ${datas.name} <br> ${datas.lastname}</h4>
   <h4 id="roleUserDB">${roleperfil}</h4>
   `;

   chargeNameDB.innerHTML += info;
 })
 
   
   
  
}



perfilTab.addEventListener('click', function(e){ 
  e.preventDefault(); 
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
})

/*  +++++++++++++++++++++++++++++++++++ INTERFAZ ++++++++++++++++++++++++++++++++++ */
function verInterfazInstructor() {
  var plataforma = document.getElementById("plataforma").style.display = "block";
  
 
}
function verInterfazAlumno(){
 var convierteInstructor = (document.getElementById("convierteInstructor").style.display = "block");
}

/*asignarIdInstr.addEventListener('click', function(e){  
  var endpointSesion = "http://localhost/api/session";
  fetch(endpointSesion)
  .then(res=> res.json())
      .then(datas=> { 
      window.location.href = "/html/plataforma-para-que-usen-instructores.html"+ "?instructor=" +  datas.id;

      });
  
});*/


/*
              var entero = parseInt(datas[i].grade, 10);
              var generarId = "star" + entero + datas[i].id ;
              console.log(generarId);
             var cualStarr= document.getElementById(generarId);
            
             //cualStarr.click();
             //cualStarr.setAttribute("checked");
             //document.getElementById(generarId).checked = true;
              cualStarr.setAttribute("checked");*/