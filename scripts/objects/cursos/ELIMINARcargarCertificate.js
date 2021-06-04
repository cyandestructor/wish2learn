document.addEventListener("DOMContentLoaded", () => {  
	const params = new URLSearchParams(window.location.search);
	//curso=9?user=4
	var curso= params.get('curso');
	var nameUser= params.get('user');
	var nameInstructo= params.get('instructor');
	var keyCertificate= params.get('key');

	var endpoint="http://localhost/api/certificates/"+ keyCertificate;

	

	fetch(endpoint)
	.then(res=> res.json())
	    .then(datas=> { 
	    	console.log(datas);
	    	
	    	
	    });
})