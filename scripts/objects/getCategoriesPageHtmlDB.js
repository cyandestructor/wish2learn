
var page=1;

var endpoint1 = "http://localhost/api/categories?count=10&page=";
var endpointFinal =  endpoint1 + page;
console.log(endpointFinal);
fetch(endpointFinal)
.then(res=> res.json())
.then(categories => {
    console.log(categories);
    consultarCategorias(categories);
})

siguienteInformacion.addEventListener('click', function(e){
  page=page + 1;
  console.log(page);
  var endpoint1 = "http://localhost/api/categories?count=10&page=";
  var endpointFinal =  endpoint1 + page;

  fetch(endpointFinal)
  .then(res=> res.json())
  .then(categories => {
      console.log(categories);
      consultarCategorias(categories);

  })
  var listaCategorias = document.getElementById('colocarAvisos');
       listaCategorias.innerHTML = ` `;
       
});

anteriorInformacion.addEventListener('click', function(e){
  if(page > 1){
     page=page - 1;
      console.log(page);
      var endpoint1 = "http://localhost/api/categories?count=10&page=";
      var endpointFinal =  endpoint1 + page;

      fetch(endpointFinal)
      .then(res=> res.json())
      .then(categories => {
          console.log(categories);
          consultarCategorias(categories);
      })
  }else{
    var listaCategorias = document.getElementById('colocarAvisos');
       listaCategorias.innerHTML += ` 
        <div class="alert alert-danger" role="alert">
         Has llegado al inicio
        </div>
       `;
    
  }
 
});

function consultarCategorias(data){

    var listaCategorias = document.getElementById('insertaListaCategorias');
    listaCategorias.innerHTML = ` `;
    let saberMultiplo;  
    let guardarIndex;
    if(data.length== 0){
      console.log('Ya no hay informacion');
       listaCategorias.innerHTML = ` 
        <div class="alert alert-danger" role="alert">
         No hay más categorias para explorar
        </div>
       `;
    } else {
     
      for (var i = 0; i < data.length; i++){
        saberMultiplo = i % 3
         if( saberMultiplo  == 0 || i == 0 ){ 
              guardarIndex= i;
               var listaCategory = "filaCategoria" + i ;
               const item = document.createElement('div');
               item.setAttribute("class","row");
               item.setAttribute("style", "display: flex; margin-top: 20px; margin-bottom: 20px;");
               item.setAttribute("id",listaCategory);
               listaCategorias.appendChild(item);

               var cualFilaCategories = 'filaCategoria' + guardarIndex;
               const insertaNormal = document.getElementById(cualFilaCategories);
                var row = `
                    <div class="card text-white bg-dark  col-md-4" style="max-width: 18rem; margin:auto; height:100%;">

                      <div class="card-header">${data[i].name}</div>
                      <div class="card-body">
                     
                        <p class="card-text">${data[i].description}</p>
                      </div>
                    </div> `;
               insertaNormal.innerHTML += row;
         }else{
            var cualFilaCategories = 'filaCategoria' + guardarIndex;
               const insertaNormal = document.getElementById(cualFilaCategories);
                var row = `
                    <div class="card text-white bg-dark  col-md-4" style="max-width: 18rem; margin:auto; height:100%">
                     <div class="card-header">${data[i].name}</div>
                      <div class="card-body">
                     
                        <p class="card-text">${data[i].description}</p>
                      </div>
                    </div> `;
               insertaNormal.innerHTML += row;
         }
       
        
     } 

    }
    
}
