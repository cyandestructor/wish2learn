var endpoint2 = 'http://localhost/api/categories?count=10&page=1';
//var endpoint1 = "http://localhost/api/categories/";
const comboBox = document.querySelector('#categoriasDB');
// Es una petición GET, así que no hay que configurar nada ya que fetch
// por defecto manda una petición GET
fetch(endpoint2)
    .then((res) => res.json())
    .then((categories) => {
        categories.forEach((category) => {
            const item = document.createElement('option');
            item.innerHTML += `
    				${category.name}
    			`;
            comboBox.appendChild(item);
        });
    });
