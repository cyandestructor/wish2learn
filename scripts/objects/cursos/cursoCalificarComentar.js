import Utility from "/scripts/Utility.js";

saveReviewRate.addEventListener('click', function(e){ 
	var cursoId = document.getElementById('cargarCursosCompletados').value;
	var rateValue = $("input[type='radio']:checked").val();

	var endpoint = "http://localhost/api/courses/" + cursoId + "/reviews";
	var btnUser = document.getElementById('obtenerUserID');
	var userid = btnUser.getAttribute("data-index-number");
	alert(userid);
	var comentarioTexto = document.getElementById('comentarioTexto').value;

	var data = {"body": comentarioTexto , "userId": userid, "rate": rateValue};

	fetch(endpoint,{
	    method: 'POST',
	    body:JSON.stringify(data),
	    headers: {
	        "Content-Type": "application/json",
	      }
	    })
	.then(res=> res.json())
	    .then(datas=> { 
	    	console.log(datas);
	    	
	    });
})
function guardarComentarioCalificacion(){
	var obtenerID = document.getElementById('obtenerUserID');
	var rate = $("input[type='radio']:checked").val();
}