import Utility from "/scripts/Utility.js";
busquedaImplacable.addEventListener('submit', function(e){ 
e.preventDefault(); 
var queValue = document.getElementById("busquedaImplacableInput").value;
var queBusco = encodeURIComponent(queValue);

window.location.href = "/html/resultados-busqueda.html"+ "?curso=" + queBusco;
})

/*
[12:55 a. m.] BRYAN EMMANUEL DUARTE LOZANO
    Puedes hacer lo siguiente:
La barra de búsqueda es un input o un form, 
en el submit o presionando un botón se obtiene el contenido 
de ese input y se agrega a un enlace que te haga un redirect 
al html de resultados pero agregandole en el url en el query 
lo que escribió el usuario
​[12:56 a. m.] BRYAN EMMANUEL DUARTE LOZANO
    Luego en el otro html, con un script que se cargue al inicio de la página obtener esos query params como en el enlace que te acabo de mandar, para hacer la llamda a la api y obtener los resultados
​[12:57 a. m.] BRYAN EMMANUEL DUARTE LOZANO
    Incluso te puede funcionar para  otros casos, en vez de usar un url personalizado del htaccess

*/