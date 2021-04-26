import User from "../objects/User.js";
import Utility from "../Utility.js";

document.getElementById("uploadAvatar").addEventListener("click", (e) => {
  const button = e.target;
  const avatarInput = document.getElementById("upload");

  if (avatarInput && "files" in avatarInput) {
    const avatar = avatarInput.files[0];

    const user = new User(
      (response) => {
        if (response.ok) {
          // Display success message / Mostrar mensaje de éxito
          Utility.displayMessage(
            "displayImageMessage",
            "Imaged changed successfuly"
          );
          Utility.displayErrors("displayImageErrors", null);
          return;
        }

        // Se puede realizar una acción de acuerdo al código de respuesta (response.status)
      },
      (errors) => {
        // Display errors / Mostrar errores
        Utility.displayMessage("displayImageMessage", "");
        Utility.displayErrors("displayImageErrors", errors);
      }
    );

    // Obtener el id del usuario a través del dataset del botón
    // El dataset es una forma sencilla de obtener y mandar datos al DOM
    // Ejemplo:
    // En HTML --> <button id="exampleBtn" data-userId="45"> Example </button>
    // En JS --> let id = document.getElementById('exampleBtn').dataset.userId;
    //            console.log(id) // Imprime 45
    // Más información sobre dataset:
    // https://xcatherine-jimenez.medium.com/using-dataset-in-javascript-4bfa2d657590
    const userId = button.dataset.userid;
    if (userId) {
      user.setAvatar(userId, avatar);
    }
  }
});

document.getElementById("userEditionForm").addEventListener("submit", (e) => {
  // Prevent the default submit behaviour
  // Previene el comportamiento por defecto del submit
  e.preventDefault();

  const form = e.target;
  // La clase Utility tiene una función para convertir la información
  // de un form a un objeto de JS:
  const userInfo = Utility.formDataToObject(new FormData(form)); // Contiene la nueva información

  // Quitar del objeto todos los campos que no tengan información Ej. '' string vacío
  for (const key in userInfo) {
    if (Object.hasOwnProperty.call(userInfo, key)) {
      if (!userInfo[key]) {
        delete userInfo[key];
      }
    }
  }

  const user = new User(
    (response) => {
      if (response.ok) {
        // Display success message / Mostrar mensaje de éxito
        form.reset();
        Utility.displayMessage("displayEditionMessage", "User edited");
        Utility.displayErrors("displayEditionErrors", null);
        return;
      }

      // Se puede realizar una acción de acuerdo al código de respuesta (response.status)
    },
    (errors) => {
      // Display errors / Mostrar errores
      Utility.displayMessage("displayEditionMessage", "");
      Utility.displayErrors("displayEditionErrors", errors);
    }
  );

  const userId = form.dataset.userid;
  if (userId) {
    user.edit(userId, userInfo);
  }
});
