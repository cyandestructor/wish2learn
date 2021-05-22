const chargeNameDb = document.querySelector("#chargeNameDB");

//el siguiente bloque es para ver la informacion en la consola del navegador
/*function cargarNameDB(){
	let info;
	fetch("http://localhost/api/users/2")
	.then(resultado => resultado.json())
	.then(data=> console.log(data))
		
}
cargarNameDB();
*/
//carga el nombre y rol en la pagina principal
function cargarNameDB(){
	let info;
	let roleperfil;
	fetch("http://localhost/api/users/2")
	.then(resultado => resultado.json())
	.then(datas=> {
		if(datas.role = 1){
			roleperfil = "Perfil estudiante";
		}
		console.log(datas)
		info = ` 
				  <h4>Empecemos a aprender, ${datas.name} <br> ${datas.lastname}</h4>
                  <h4 id="roleUserDB">${roleperfil}</h4>
			`;

		chargeNameDB.innerHTML= info;
	})
}
cargarNameDB();