document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    console.log(params.toString());
    var buscarInstructor = params.get('instructor');
   cargarNameDB(buscarInstructor);
   cargarVentas(buscarInstructor);
});

function cargarVentas(queInstructor){
    var endpointVentas = "http://localhost/api/users/" + queInstructor + "/sales";

    fetch(endpointVentas)
    .then(res=> res.json())
    .then(datas=> { 
        console.log(datas);
        console.log(datas.sales);
        var insertarVentas = document.getElementById("ventas");
        for (var i = 0; i < datas.sales.length; i++){ 
        insertarVentas.innerHTML += `<p>${datas.sales[i].productName}</p>`;
        }
    });
}


const cargaAlgo = document.getElementById('cargarAlgo');

function cargarNameDB(queInstructor){
	
	let info;
	let roleperfil;
 

  var endpointPerfil = "http://localhost/api/users/" + queInstructor;

  fetch(endpointPerfil)
  .then(resultado => resultado.json())
  .then(datas=> {
    
    var imagen = document.getElementById('cargaImagen');
    console.log("este es el rol de este perfil " + datas.role);
    if(datas.role == 1){
     
     roleperfil = "Perfil estudiante";
   }else{
    roleperfil = "Perfil Instructor";
    
   }
   
   imagen.innerHTML =  ` 
     <img src="http://localhost/api/users/${queInstructor}/avatar" alt="foto de Perfil" class="img-thumbnail" onerror="this.onerror=null;this.src='/assets/images/notUserImage.png';">
   `;
   const nameUserDB = document.querySelector('#nameUserDBinsert');
        nameUserDB.setAttribute("value",    datas.name );
        //apellido
        const lastNameUserDB = document.querySelector('#lastNameUserDBinsert');
        lastNameUserDB.setAttribute("value",    datas.lastname);
        //nombre de usuario
        const userNameDB = document.querySelector('#userNameDBinsert');
        userNameDB.setAttribute("value",    datas.username );
       
        var descripcion = datas.description;
        const descripDB = document.querySelector('#descripcionDB');
        if( descripcion == null ){
          descripcion = "Aún no hay una descripción";
        }
        descripDB.innerHTML = descripcion;
        const roleDB = document.querySelector('#actualRolDB');
        roleDB.setAttribute("value", roleperfil );

        const fechaActividad = document.querySelector('#fechaActividad');
        fechaActividad.setAttribute("value", datas.lastChangeDate );
 })
}

function perfilTab(){
  

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

        
      
      })
}

/*  +++++++++++++++++++++++++++++++++++ INTERFAZ ++++++++++++++++++++++++++++++++++ */
/*function verInterfazInstructor() {
  var plataforma = (document.getElementById("plataforma").style.display = "block");
 
}
function verInterfazAlumno(){
 var convierteInstructor = (document.getElementById("convierteInstructor").style.display = "block");
}*/
/*
              var entero = parseInt(datas[i].grade, 10);
              var generarId = "star" + entero + datas[i].id ;
              console.log(generarId);
             var cualStarr= document.getElementById(generarId);
            
             //cualStarr.click();
             //cualStarr.setAttribute("checked");
             //document.getElementById(generarId).checked = true;
              cualStarr.setAttribute("checked");*/