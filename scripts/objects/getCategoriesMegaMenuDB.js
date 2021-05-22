var endpoint1 = "http://localhost/api/categories?count=10&page=1";

fetch(endpoint1)
.then(res=> res.json())
.then(categories => {
    console.log(categories);
    consultarCategorias(categories);
})

function consultarCategorias(data){
     var megaMenu = document.getElementById('categoriasMegaMenu');
     let saberMultiplo;  
     let guardarIndex;

      megaMenu.innerHTML += `
                     <a href="/html/lista-categorias.html" class="btn btn-dark">Ver todas</a>            
               `;
    for (var i = 0; i < data.length; i++){
        saberMultiplo = i % 4
        
         if( saberMultiplo  == 0 || i == 0 ){ 
               guardarIndex= i;
                var megaMenuItem = "megaMenuItem" + i ;
               const item = document.createElement('div');
               item.setAttribute("class","col-sm-6");
               item.setAttribute("id",megaMenuItem);
               megaMenu.appendChild(item);

               var cualItemMegaMenu = 'megaMenuItem' + guardarIndex;
               const insertaNormalMM = document.getElementById(cualItemMegaMenu);
                var row = `
                      <a href="#" class="dropdown-item">${data[i].name}</a>   
               `;
                insertaNormalMM.innerHTML += row;
               //echo(numero + ' es multiplo de 4');
         } else{
             var cualItemMegaMenu = 'megaMenuItem' + guardarIndex;
               const insertaNormalMM = document.getElementById(cualItemMegaMenu);
                var row = `
                      <a href="#" class="dropdown-item">${data[i].name}</a>   
               `;
                insertaNormalMM.innerHTML += row;
         }
     } 
}
