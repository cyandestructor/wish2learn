<?php
    $userId = isset($_GET['userId']) ? $_GET['userId'] : null;
?>
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/barranav.css">
    <link rel="stylesheet" href="/css/perfil.css">
    <link href="/css/all.css" rel="stylesheet"> <!--load all styles -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
 
    <title>Hello, world!</title>
  </head>
  <body>
    <nav class="navbar navbar-expand-md navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand black" href="#">Wish2Know</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Busca tu sueño aquí" aria-label="Search">
                <!--  <button class="btn btn-outline-success" type="submit">Search</button>-->
                <button class="btn btn-outline-success" type="submit">Buscar</button>
             </form>
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
              <li class="nav-item dropdown menu-area active">
                <a class="nav-link dropdown-toggle" href="#" id="mega-one" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Categorias </a>
                <div class="dropdown-menu mega-area" aria-labelledby="mega-one">
                  <div class="row">
                    <div class="col-sm-6">
                        <h4>Desarrollo</h4>
                        <a href="#" class="dropdown-item">Desarrollo móvil</a>
                        <a href="#" class="dropdown-item">Desarrollo de base de datos</a>
                        <a href="#" class="dropdown-item">Subcategoria 1</a>
                        <a href="#" class="dropdown-item">Subcategoria 1</a>
                    </div>
                    <div class="col-sm-6">
                      <h4>Prueba 2</h4>
                      <a href="#" class="dropdown-item">Subcategoria 1</a>
                      <a href="#" class="dropdown-item">Subcategoria 1</a>
                      <a href="#" class="dropdown-item">Subcategoria 1</a>
                      <a href="#" class="dropdown-item">Subcategoria 1</a>
                    </div>
                    <div class="col-sm-6">
                      <h4>Prueba 3</h4>
                      <a href="#" class="dropdown-item">Subcategoria 1</a>
                      <a href="#" class="dropdown-item">Subcategoria 1</a>
                      <a href="#" class="dropdown-item">Subcategoria 1</a>
                      <a href="#" class="dropdown-item">Subcategoria 1</a>
                    </div>
                    <div class="col-sm-6">
                      <h4>Prueba 4</h4>
                      <a href="#" class="dropdown-item">Subcategoria 1</a>
                      <a href="#" class="dropdown-item">Subcategoria 1</a>
                      <a href="#" class="dropdown-item">Subcategoria 1</a>
                      <a href="#" class="dropdown-item">Subcategoria 1</a>
                    </div>
                  </div>  
                </div> <!-- dropdown-mega-menu.// -->
            </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Enseña en W2L</a>
              </li>
              
              <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
              </li>
             
            </ul>
           
            <ul class="navderbtns">
              <li>   
                <a href="registro_f.html" class="btn btn-outline-success" role="button">Registrarse</a>
              </li> 
              <li>   
                <button class="btn btn-outline-success morado" type="submit">Iniciar sesión</button>
              </li> 
              
            </ul>
            <ul class="navderbtns">
              <li class="nav-item ">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-square" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
              </svg>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    
    <!-- CARGAR IMAGENES -->
    <h3 class="">Editar perfil</h3>
    <div id="margintp" class="row container">
        <div class="col-md-6">
            <!-- Upload image input
            <input id="upload" type="file" onchange="readURL(this);" class="form-control border-0">
                -->
            <div class="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
                <input id="upload" type="file" onchange="readURL(this);" class="form-control border-0">
                
            </div>

            <!-- Uploaded image area-->
            <p class="font-italic text-white text-center">Vista previa de imagen</p>
            <div class="image-area mt-4"><img id="imageResult" src="#" alt="" class="img-fluid rounded shadow-sm mx-auto d-block"></div>
            <button id="uploadAvatar" data-userId="<?php if(isset($userId)){ echo $userId; } ?>" class="btn btn-primary btn-lg" role="button" aria-pressed="true">Guardar</button>
            <div id="displayImageErrors" style="color: tomato;"></div>
            <div id="displayImageMessage" style="color: turquoise;"></div>
        </div>
        <div class="col-md-6">

        </div>
    </div>
    <div id="margintp2" class="row container">
        <div class="">
            <form id="userEditionForm" data-userId="<?php if(isset($userId)){ echo $userId; } ?>" class="needs-validation" novalidate>
                <div class="form-row">
                  <div class="col-md-4 mb-3">
                    <label for="validationCustom01">First name</label>
                    <input name="name" type="text" class="form-control" id="validationCustom01" placeholder="First name">
                    <div class="valid-feedback">
                      Looks good!
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="validationCustom02">Last name</label>
                    <input name="lastname" type="text" class="form-control" id="validationCustom02" placeholder="Last name">
                    <div class="valid-feedback">
                      Looks good!
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="validationCustomUsername">Username</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend">@</span>
                      </div>
                      <input name="username" type="text" class="form-control" id="validationCustomUsername" placeholder="Username" aria-describedby="inputGroupPrepend">
                      <div class="invalid-feedback">
                        Please choose a username.
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="disabledTextInput">Correo electronico</label>
                  <div class="input-group ">
                    <input name="email" type="text" id="disabledTextInput" class="form-control" placeholder="example@mail.com">  
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-6 mb-3">
                    <div class="form-group">
                        <label>Describete a ti mismo</label>
                        <textarea name="description" class="form-control"  placeholder="Cuenta lo más interesante de ti" rows="3"></textarea>
                      </div>
                  </div>
                </div>
                <div id="displayEditionErrors" style="color: tomato;"></div>
                <div id="displayEditionMessage" style="color: green;"></div>
                <button class="btn btn-primary" type="submit">Actualizar datos</button>
              </form>
        </div>
    </div>

    <script src="/scripts/pages/EditUser.js" type="module">
      // import Utility from "../scripts/Utility.js";
      // document.getElementById("userEditionForm").addEventListener("submit", (e) => {
      //   e.preventDefault();
      //   const form = e.target;
      //   // La clase Utility tiene una función para convertir la información
      //   // de un form a un objeto de JS:
      //   const userInfo = Utility.formDataToObject(new FormData(form)); // Contiene la nueva información
      //   console.log(userInfo);
      // });
    </script>
    <!-- TERMINA CARGAR IMAGENES-->

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="/jquery3.min.js"></script>
    <script src="/js/showimage.js"></script>
    <script src="/js/bootstrap.min.js" ></script>
    <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
<!-- Optional JavaScript; choose one of the two! -->

    <!-- Option 1: Bootstrap Bundle with Popper
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
 -->
    <!-- Option 2: Separate Popper and Bootstrap JS -->
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.6.0/dist/umd/popper.min.js" integrity="sha384-KsvD1yqQ1/1+IA7gi3P0tyJcT3vR+NdBTt13hSJ2lnve8agRGXTTyNaBYmCR/Nwi" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.min.js" integrity="sha384-nsg8ua9HAw1y0W1btsyWgBklPnCUAFLuTMS2G72MMONqmOymq585AcH49TLBQObG" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js" integrity="sha384-LtrjvnR4Twt/qOuYxE721u19sVFLVSA4hf/rRt6PrZTmiPltdZcI7q7PXQBYTKyf" crossorigin="anonymous"></script>
  </body>
</html>