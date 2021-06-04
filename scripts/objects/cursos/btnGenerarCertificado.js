btnGenerarCertificado.addEventListener('click', function(e){  

   /*id_user INT,
    IN id_instructor INT,
    IN id_course INT*/
	
	var  iduser = document.getElementById("obtenerUserID");
	var obtenerUserID = iduser.getAttribute("data-index-number");
	
	 var queIns = document.getElementById("instructorId");
	var idInstructor = queIns.getAttribute("data-index-number");

	var queIdCurso = document.getElementById("cargarCursosCompletados").value;
	

	var data = {"userId": obtenerUserID , "instructorId": idInstructor, "courseId":  queIdCurso };

	var endpoint = "http://localhost/api/certificates";
	fetch(endpoint,{
    method: 'POST',
    body:JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
      }
    })
	.then(response =>{
	    	if(response.ok){
	    		alert("todo esta OK");
	    	}
	    	return response.json();
	    }) 
	    .then(datas=> { 
	    	console.log(datas);
	    	
	    	window.location.href = "/html/certificadoVersion2.html"
				+ "?curso=" + queIdCurso
				+ "&instructor=" + idInstructor 
				+ "&user=" + obtenerUserID
				+ "&key=" + datas.id
				;
	    });

	

})