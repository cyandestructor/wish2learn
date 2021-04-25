import User from "../objects/User.js";

const loadUser = (user) => {
  // Display user info
};

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const userId = path.substr(path.lastIndexOf("/")); // Ex. /users/{id}

  const user = new User((response) => {
    if (response.ok) {
      // Load user info
      response.json().then(loadUser(data));
      return;
    }

    if (response.status == 404) {
      // Show 404 message
      return;
    }
  });

  if (userId) {
    user.getInformation(userId);
  }
});
