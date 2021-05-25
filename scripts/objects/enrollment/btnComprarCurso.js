comprarCurso.addEventListener('click', function(e){ 

 //aqui obtiene el id del curso que se va a comprar
var endpointUser ="http://localhost/api/session"; 
fetch(endpointUser)
	 .then(res=> res.json())
	    .then(datas=> { 
		var queValue = document.getElementById('comprarCurso');
		var queV = comprarCurso.getAttribute("data-index-number");
		generarVenta(datas.id);
		alert(queV);
	    	window.location.href = "/html/interfaz-curso-adquirido.html"+ "?curso=" + queV + "&user=" + datas.id;
	    }); 
})
function generarVenta(idUser){
/*	sellerId es el id del instructor del curso
el que vende el producto
customerId es el id del usuario que se va a inscribir, el que compra el producto
*/
var sellerId = queInstructorID.getAttribute("data-index-number");
var queCurso = comprarCurso.getAttribute("data-index-number");
var queProd = queProductoId.getAttribute("data-index-number");
var data = {"sellerId": sellerId , "customerId": idUser, "productId": queProd};
var endpoint = "http://localhost/api/sales"
fetch(endpoint,{
    method: 'POST',
    body:JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
      }
    }).then(res=> res.json())
	    .then(datas=> { 
	    	console.log(datas);
	    	
	    });
}
