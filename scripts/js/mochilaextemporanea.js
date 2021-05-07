function mochilaextemporanea(){
    
    const demoId = document.querySelector('#mochilaextemporanea');
    demoId.removeAttribute('href');
    demoId.setAttribute('href', 'sesioniniciada_wishlist.html');

    const operacion = require("./mochila");
    operacion.activarlo();
}