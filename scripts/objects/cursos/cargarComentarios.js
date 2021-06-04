document.addEventListener("DOMContentLoaded", () => {  
	const path = window.location.pathname;
 	 const courseId = path.substr(path.lastIndexOf("/") + 1);

	var endpoint = "http://localhost/api/courses/" + courseId + "/reviews?count=10&page=1"; 
	fetch(endpoint)
	.then(res=> res.json())
	    .then(datas=> { 
	    	console.log(datas);
	    	for (var i = 0; i < datas.length; i++){ 
	    		var insertaComentarios = document.getElementById('insertarComentarios');
	    		console.log("este es el id usuario " + datas[i].userId);
	    		insertaComentarios.innerHTML +=  ` 
							<div class="media mt-4"> 
      							<img class="rounded-circle" alt="Bootstrap Media Another Preview" src="localhost/api/users/${datas[i].userId}/avatar" 

     onerror="this.onerror=null;this.src='/assets/images/notUserImage.png';">

                                <div class="media-body">
                                        <div class="row">
                                            <div class="col-12 d-flex">
                                                <h5>${datas[i].userName}</h5> 
                                            </div>
                                            <br><span>${datas[i].date}</span>
                                        </div> 
                                        <p>${datas[i].body}</p>
                                 </div>
                            </div>
                            `;
	    	}

	    });
})

function tieneAvatar(){

}