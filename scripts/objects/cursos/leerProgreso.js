let numeroSecciones= 0;
let porcentaje = 100;
  let promedio = 0 ;
  let promedioLecciones = 0 ;
  let saberIdBarra;
  var queUsuario;
  var queCurso;
document.addEventListener("DOMContentLoaded", () => { 
console.log("SE ABRE el progreso");
    //aqui obtengo el numero de secciones que tengo en el curso
    /*const params = new URLSearchParams(window.location.search);
    console.log(params.toString());
    var courseId = params.get('course');*/
  
  var endpointSesion = "http://localhost/api/session";
  fetch(endpointSesion)
  .then(response =>{
    if(response.ok){
          //alert("todo esta OK");
        }
        return response.json();
      }) 
  .then(datas=> { 
    queUsuario = datas.id;
    cargarEnrollments(datas.id);

  });

})

function cargarEnrollments(idUser){
  var endpoint = "http://localhost/api/users/"+ idUser+"/enrollments";
  fetch(endpoint)
  .then(res=> res.json())
      .then(datas=> { 
        for (var i = 0; i < datas.length; i++){
          saberIdBarra = datas[i].id;
        cargarSecciones(datas[i].id);
        
        }
      });
}
function cargarSecciones(courseId){
      console.log(courseId);
      console.log("CARGANDO cursos");
        var endpoint = "http://localhost/api/courses/"+ courseId +"/sections";
       queCurso=courseId;
        fetch(endpoint)
        .then(res=> res.json())
        .then(datas=> { 
            //barraprogreso(datas.length);
            let cuantasSecciones = parseInt(datas.length , 10);
            promedio = 100 / cuantasSecciones ;
            for (var i = 0; i < datas.length; i++){
               obtenerLecciones(datas[i].id);
              console.log("va a la leccion");
            }
           
            })
}
var siCompletas = 0;
  var sumarPorcentaje = 0;
  let cuantasNoCompletas = 0;
  let porcentajeVerde = 0;
function obtenerLecciones(idSeccion){
   
    console.log(idSeccion);
    var endpoint = "http://localhost/api/sections/" + idSeccion + "/lessons?userId="+queUsuario ;
   
    console.log(endpoint);

    fetch(endpoint)
   .then(res=> res.json())
   .then(datas=> { 
    console.log(datas);
    for (var i = 0; i < datas.length; i++){
    console.log(datas[0].completed);
    promedioLecciones = promedio / datas.length;
    console.log(promedioLecciones);

      if(datas[0].completed == true){
        siCompletas = siCompletas + 1;
        sumarPorcentaje = promedioLecciones * siCompletas;
      }
          
    }
  console.log(sumarPorcentaje);
       barrita(sumarPorcentaje);     
        // guardarProgreso(datas[0].id);
    })
   console.log("va a la seccion")
}

function barrita(suma){
    var generar = "progressBar" + queCurso;
            console.log(generar);
        /* let element = document.getElementById(generar);
          let elementStyle = window.getComputedStyle(element);
          let elementWidth = element.getPropertyValue("width");
*/
          let element3 = document.getElementById(generar);
         //console.log(promedioLecciones);
          console.log(suma);
           //console.log(elementWidth);
           let convertirPix= suma + "%";
           // let sumar = convertirPix;
        console.log(suma);
        /*"calc(" + elementWidth + " + 500px)"*/
        //NO NO NO NO NO NO mover el espacio de la suma de elementWidth y convertirPix, es una regla de sintaxis

          let labelPercent = document.getElementById("porcentaje");
          let element4 = (element3.style.width = "calc(" + convertirPix +")");
          let mostrarPorcentaje= 0;
       
         console.log(element3.style.width);
        // guardarProgreso(datas[0].id);
}
function guardarProgreso(idInput){
    const params = new URLSearchParams(window.location.search);
    console.log(params.toString());
    var userId = params.get('user');
    var completed="true";
    data = {"userId": userId , "lessonId": idInput, "completed":completed }

    var endpoint="http://localhost/api/users/"+ userId +"/lessons/"+ idInput+"?completed=true";
    fetch(endpoint,{
    method: 'PUT',
    body:JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
      }
    }).then(response =>{
            if(response.ok){
                //alert("todo esta OK");
            }
           // return response.json();
        })
        .then(datas=> { 
           // console.log(datas);
          // alert('funciona')
        });
}