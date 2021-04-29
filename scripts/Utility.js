export default class Utility {
    static objectIsEmpty(object) {
        // Based on:
        // https://www.samanthaming.com/tidbits/94-how-to-check-if-object-is-empty/

        return (
            Object.keys(object).length === 0 && object.constructor === Object
        );
    }

    static formDataToObject(formData, multiFields = null) {
        // Based on:
        // https://www.learnwithjason.dev/blog/get-form-values-as-json

        let object = Object.fromEntries(formData.entries());

        // If the data has multi-select values
        if (multiFields && Array.isArray(multiFields)) {
            multiFields.forEach((field) => {
                object[field] = formData.getAll(field);
            });
        }

        return object;
    }

    static setInputFilter(textbox, inputFilter) {
        // Based on:
        // https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input

        [
            'input',
            'keydown',
            'keyup',
            'mousedown',
            'mouseup',
            'select',
            'contextmenu',
            'drop',
        ].forEach(function (event) {
            textbox.addEventListener(event, function () {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty('oldValue')) {
                    this.value = this.oldValue;
                    this.setSelectionRange(
                        this.oldSelectionStart,
                        this.oldSelectionEnd
                    );
                } else {
                    this.value = '';
                }
            });
        });
    }

    static displayErrors(id, errors) {
        const container = document.getElementById(id);

        container.innerHTML = '';

        for (const key in errors) {
            if (Object.hasOwnProperty.call(errors, key)) {
                const error = errors[key];
                container.innerHTML += error + '<br>';
            }
        }
    }

    static displayMessage(id, message) {
        const container = document.getElementById(id);

        container.innerHTML = message;
    }
}
