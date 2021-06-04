document.addEventListener("DOMContentLoaded", () => { 

   /*id_user INT,
    IN id_instructor INT,
    IN id_course INT*/
    const params = new URLSearchParams(window.location.search);
	//curso=9?user=4
	var keyCertificate= params.get('key');
	
    var endpoint = "http://localhost/api/certificates/" + keyCertificate;
    
    var insertaNameUser = document.getElementById('cargaNameUser');
	var insertarKey = document.getElementById('cargaKey');
	var insNameInstructor = document.getElementById('cargaNameInstructor');
	var insNameCurso = document.getElementById('cargaNameCurso');
	
	var insExpeditionDate = document.getElementById('expeditionDate');
	var insFirma = document.getElementById('cargaFirma');
    fetch(endpoint)
	.then(res=> res.json())
	    .then(datas=> { 
	    	console.log(datas);
	    	
	    	insertaNameUser.innerHTML = `${datas.userName} `;
			insertarKey.innerHTML = `${datas.id} `;
			insNameInstructor.innerHTML = `${datas.instructorName} `;
			insNameCurso.innerHTML = `${datas.courseTitle} `;
			var nameI= datas.instructorName;
			nameI.charAt(0).toUpperCase();
			insFirma.innerHTML = `<i style="font-size:70px;"><u style="font-family: 'Allura', cursive;">${nameI}</u></i> `;
			insExpeditionDate.innerHTML = `${datas.expeditionDate} `;
	    });

})