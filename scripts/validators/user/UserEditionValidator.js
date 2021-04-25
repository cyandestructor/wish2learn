import Validations from "../Validations.js";
import UserValidator from "./UserValidator.js";
import { interpretError } from "../ValidationsUtility.js";

export default class UserEditorValidator extends UserValidator {
  validate() {
    if (super.user.hasOwnProperty("username")) {
      super.validateUsername();
    }
    if (super.user.hasOwnProperty("email")) {
      super.validateEmail();
    }
    if (super.user.hasOwnProperty("name")) {
      super.validateName();
    }
    if (super.user.hasOwnProperty("lastname")) {
      super.validateLastname();
    }
    if (super.user.hasOwnProperty("password")) {
      super.validatePassword();
    }
    if (super.user.hasOwnProperty("description")) {
      this.validateDescription();
    }

    return super.errors;
  }

  validateDescription() {
    const field = "description";
    let description = String(this.user[field]).trim();

    const maxLength = 1000;

    let validate = new Validations(description);
    validate.maxLength(maxLength).notRequired();

    let error = validate.lastError;
    if (error !== Validations.Error.None) {
      let message = interpretError(field, error, 0, maxLength);
      super.addError(field, message);
    }
  }
}
