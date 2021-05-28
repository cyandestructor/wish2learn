document.addEventListener("DOMContentLoaded", () => {

  var endpointSesion = "http://localhost/api/session";
  let cualID;
  const chargeNameDb = document.querySelector("#chargeNameDB");
  let guardarID;
var ponFotoPerfil = document.getElementById('fotoPerfilMaestro');
  fetch(endpointSesion)
  .then(response =>{
    if(response.ok){
	    		//alert("todo esta OK");
	    	}
	    	return response.json();
	    }) 
  .then(datas=> { 
    console.log( datas)
    chargeNameDb.innerHTML = ` 
    <br>
    <div class="" id="obtenerUserID" data-index-number="${datas.id}" style="display:none;">

    </div>

    `;
  
  ponFotoPerfil.innerHTML  = `<img src="http://localhost/api/users/${datas.id}/avatar" alt="${datas.name}"  onerror="this.onerror=null;this.src='/assets/images/notUserImage.png';" > `;
         
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

  var endpointEnrollments= "http://localhost/api/users/"+ data.id + "/courses?public=false";
  
  /* var insertarCursosCompletos = document.getElementById('cargarCursosCompletados');*/
  fetch(endpointEnrollments)
  .then(res=> res.json())
      .then(datas=> { 
        console.log(datas);

         for (var i = 0; i < datas.length; i++){ 
         var insertarCursosUser = document.getElementById('coursesTeacher');

           insertarCursosUser.innerHTML += ` 
            <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <!--<a href="http://localhost/api/courses/${datas[i].id}?course=${datas[i].id}">-->
               <a href="http://localhost/html/edit-course.html?course=${datas[i].id}">
                <div class="card-flyer">
                  <div class="text-box">
                      <div class="image-box">
                      <img src="http://localhost/api/courses/${datas[i].id}/image" alt="${datas[i].title}"  onerror="this.onerror=null;this.src='/assets/images/notUserImage.png';" >
                       <!--<img src="https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jpg" alt="${datas[i].title}"> -->
                      </div>
                      <div class="text-container">
                      <h6 id="courseId" data-index-number="${datas[i].id}">${datas[i].title}</h6>
                      <p>${datas[i].description}</p>
                      <br>
                     

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
       /* for (var i = 0; i < datas.length; i++){ 
           insertarCursosCompletos.innerHTML +=`<option value="${datas[i].id}">${datas[i].title}</option>`; 
         }*/
        
         
        

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
    
   }
   info = ` 
   <h4>Empecemos a aprender, ${datas.name} <br> ${datas.lastname}</h4>
   <h4 id="roleUserDB">${roleperfil}</h4>
   `;

   chargeNameDB.innerHTML += info;
 })
 
   
   
  
}



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
  
});
*/

/*
              var entero = parseInt(datas[i].grade, 10);
              var generarId = "star" + entero + datas[i].id ;
              console.log(generarId);
             var cualStarr= document.getElementById(generarId);
            
             //cualStarr.click();
             //cualStarr.setAttribute("checked");
             //document.getElementById(generarId).checked = true;
              cualStarr.setAttribute("checked");*/