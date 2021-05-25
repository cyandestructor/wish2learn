document.addEventListener("DOMContentLoaded", () => { 
	const params = new URLSearchParams(window.location.search);
	//curso=9?user=4
	var curso= params.has('curso');
	var nameUser= params.has('name');
	fetch(endpointFinal,{
	    method: 'PUT',
	    body:JSON.stringify(avatarUser),
	    headers: {
	        "Content-Type": "application/json",
	      }
	    })
	.then(res=> res.json())
	    .then(datas=> { 
	    	console.log(datas);
	    	coursesRecently(datas);
	    });
})