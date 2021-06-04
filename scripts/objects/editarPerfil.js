
var endpoint1 = "http://localhost/users/";
const chargeNameDb = document.querySelector("#chargeNameDB");

function cargarUserDB(){
    let info;
    let roleperfil;
    fetch("http://localhost/user-edition/2")
    .then(resultado => resultado.json())
    .then(datas=> {
        if(datas.role = 1){
            roleperfil = "Perfil estudiante";
        }
        console.log(datas);
        //Cargar nombre de usuario
        const nameUserDB = document.querySelector('#nameUserDBinsert');
        nameUserDB.setAttribute("value",    datas.name );
        //apellido
         const lastNameUserDB = document.querySelector('#lastNameUserDBinsert');
        lastNameUserDB.setAttribute("value",    datas.lastname);
        //nombre de usuario
         const userNameDB = document.querySelector('#userNameDBinsert');
        userNameDB.setAttribute("value",    datas.username );
        //email
         const emailDB = document.querySelector('#emailDBinsert');
        emailDB.setAttribute("value",    datas.user_email );
        //descripcion
        // const emailDB = document.querySelector('#emailDBinsert');
        //emailDB.setAttribute("value",    datas.user_email );
        //
        // const nameUserDB = document.querySelector('#nameUserDBinsert');
        //nameUserDB.setAttribute("value",    datas.name );
        descripcion = ` ${datas.description} `;
          const descripDB = document.querySelector('#descripcionDB');
        descripDB.innerHTML = descripcion;
       /* info = ` 
    
                  <h4>Empecemos a aprender, ${datas.name} <br> ${datas.lastname}</h4>
                  <h4 id="roleUserDB">${roleperfil}</h4>
            `;
        
        comboBox.appendChild(item);
        chargeNameDB.innerHTML= info;*/
    });

}
cargarUserDB();