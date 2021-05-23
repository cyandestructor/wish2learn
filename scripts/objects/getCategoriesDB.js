/* 
    const comboBox= document.querySelector('#categoriasDB');
    // Es una petición GET, así que no hay que configurar nada ya que fetch
    // por defecto manda una petición GET
    fetch(endpoint1)
    .then(res => res.json())
    .then(categories => {
    	categories.forEach( 
    		category => {
    			const item = document.createElement('option');
    			item.innerHTML += `
    				${category.name}
    			`;
    			comboBox.appendChild(item);
    		});

    	})
*/
var page = 1;

var endpoint1 = 'http://localhost/api/categories?count=10&page=';
var endpointFinal = endpoint1 + page;
console.log(endpointFinal);
fetch(endpointFinal)
    .then((res) => res.json())
    .then((categories) => {
        console.log(categories);
        consultarCategorias(categories);
    });

function consultarCategorias(data) {
    var listaCategorias = document.getElementById('categoriasDB');
    listaCategorias.innerHTML = ` `;

    if (data.length == 0) {
        console.log('Ya no hay informacion');
        var errores = document.getElementById('colocarAvisos');
        errores.innerHTML += ` 
        <div class="alert alert-danger" role="alert">
         Has llegado al final de las categorias
        </div>
       `;
    } else {
        for (var i = 0; i < data.length; i++) {
            const item = document.createElement('option');
            item.value = data[i].id;
            item.innerHTML += `
                    ${data[i].name}
                `;
            listaCategorias.appendChild(item);
        }
    }
}

//

siguienteInformacionPCC.addEventListener('click', function (e) {
    page = page + 1;
    console.log(page);
    var endpoint1 = 'http://localhost/api/categories?count=10&page=';
    var endpointFinal = endpoint1 + page;

    fetch(endpointFinal)
        .then((res) => res.json())
        .then((categories) => {
            console.log(categories);
            consultarCategorias(categories);
        });
    var listaCategorias = document.getElementById('colocarAvisos');
    listaCategorias.innerHTML = ` `;
});

anteriorInformacionPCC.addEventListener('click', function (e) {
    var errores = document.getElementById('colocarAvisos');
    errores.innerHTML = ` `;
    if (page > 1) {
        page = page - 1;
        console.log(page);
        var endpoint1 = 'http://localhost/api/categories?count=10&page=';
        var endpointFinal = endpoint1 + page;

        fetch(endpointFinal)
            .then((res) => res.json())
            .then((categories) => {
                console.log(categories);
                consultarCategorias(categories);
            });
    } else {
        var errores = document.getElementById('colocarAvisos');
        errores.innerHTML += ` 
        <div class="alert alert-danger" role="alert">
         Estas en el inicio, no puedes retroceder
        </div>
       `;
    }
});
