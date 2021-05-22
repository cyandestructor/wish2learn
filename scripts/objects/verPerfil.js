

function verPerfilDB(){
    let info;
    var roleperfil;
    fetch("http://localhost/api/users/2")
    .then(resultado => resultado.json())
    .then(datas=> {
        roleperfil= datas.role;
        if(roleperfil == 1){
            roleperfil = "Perfil estudiante";
        }else{
            roleperfil = "Perfil maestro";
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
     //    const emailDB = document.querySelector('#emailDBinsert');
      //  emailDB.setAttribute("value",    datas.user_email );
        //descripcion
        // const emailDB = document.querySelector('#emailDBinsert');
        //emailDB.setAttribute("value",    datas.user_email );
        //
        // const nameUserDB = document.querySelector('#nameUserDBinsert');
        //nameUserDB.setAttribute("value",    datas.name );
        var descripcion = datas.description;
          const descripDB = document.querySelector('#descripcionDB');
          if( descripcion == null ){
            descripcion = "Necesitas añadir una descripción";
          }
        descripDB.innerHTML = descripcion;
        const roleDB = document.querySelector('#actualRolDB');
       roleDB.setAttribute("value", roleperfil );

        const fechaActividad = document.querySelector('#fechaActividad');
        fechaActividad.setAttribute("value", datas.lastChangeDate );
       /* info = ` 
    
                  <h4>Empecemos a aprender, ${datas.name} <br> ${datas.lastname}</h4>
                  <h4 id="roleUserDB">${roleperfil}</h4>
            `;
        
        comboBox.appendChild(item);
        chargeNameDB.innerHTML= info;*/
    });

}
verPerfilDB();