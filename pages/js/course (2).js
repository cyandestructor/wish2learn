import CategoryValidator from '../../scripts/validators/category/CategoryValidator.js';
import CourseValidator from "../../scripts/validators/course/CourseValidator.js";
import Utility from "../../scripts/Utility.js";

function onDOMChange(record, observer) {
  document
    .getElementById("categoryCreationForm")
    .addEventListener("submit", (e) => {
      const form = e.target;
      let category = Utility.formDataToObject(new FormData(form));

      let validator = new CategoryValidator(category);
      let errors = validator.validate();
      
      Utility.displayErrors("categoryErrors", errors);

      e.preventDefault();
    });
}

function createCourse(course) {
  const endpoint = "http://localhost/api/post/CreateCourse.php";

  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      console.log(data);
    });
}

document
  .getElementById("courseCreationForm")
  .addEventListener("submit", (e) => {
    const form = e.target;
    let course = Utility.formDataToObject(new FormData(form));

    let validator = new CourseValidator(course);
    let errors = validator.validate();

    if (!Utility.objectIsEmpty(errors)) {
      Utility.displayErrors("courseErrors", errors);
      e.preventDefault();
    }
  });

const categoryElement = document.getElementById("anadiendo");
const observer = new MutationObserver(onDOMChange);
if (categoryElement) {
  observer.observe(categoryElement, { childList: true });
}
