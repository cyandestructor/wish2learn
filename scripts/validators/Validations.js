export default class Validations {
    #value;
    #error = 0;

    constructor(value) {
        this.#value = value;
    }

    static Error = {
        None: 0,
        Alphabetic: 1,
        Alphanumeric: 2,
        Numeric: 3,
        Match: 4,
        MinValue: 5,
        MaxValue: 6,
        MinLength: 7,
        MaxLength: 8,
        Email: 9,
        Number: 10,
        Required: 11,
    };

    alphabetic(spaces = false) {
        let exp = spaces ? /^[a-zA-Z\s]+$/g : /^[a-zA-Z]+$/g;

        if (!exp.test(this.#value)) {
            this.#error = Validations.Error.Alphabetic;
        }

        return this;
    }

    numeric(spaces = false) {
        let exp = spaces ? /^[\d\s]+$/g : /^\d+$/g;

        if (!exp.test(this.#value)) {
            this.#error = Validations.Error.Numeric;
        }

        return this;
    }

    alphanumeric(spaces = false) {
        let exp = spaces ? /^[a-zA-Z\d\s]+$/g : /^[a-zA-Z\d]+$/g;

        if (!exp.test(this.#value)) {
            this.#error = Validations.Error.Alphanumeric;
        }

        return this;
    }

    number() {
        // https://github.com/angular/angular/blob/4.3.x/packages/common/src/pipes/number_pipe.ts#L172
        if (isNaN(this.#value - parseFloat(this.#value))) {
            this.#error = Validations.Error.Number;
        }

        return this;
    }

    match(exp) {
        if (!this.#value.match(exp)) {
            this.#error = Validations.Error.Match;
        }

        return this;
    }

    email() {
        // https://emailregex.com/
        const exp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

        if (!exp.test(this.#value)) {
            this.#error = Validations.Error.Email;
        }

        return this;
    }

    minValue(value) {
        if (this.#value < value) {
            this.#error = Validations.Error.MinValue;
        }

        return this;
    }

    maxValue(value) {
        if (this.#value > value) {
            this.#error = Validations.Error.MaxValue;
        }

        return this;
    }

    minLength(length) {
        if (this.#value.length < length) {
            this.#error = Validations.Error.MinLength;
        }

        return this;
    }

    maxLength(length) {
        if (this.#value.length > length) {
            this.#error = Validations.Error.MaxLength;
        }

        return this;
    }

    required() {
        if (!this.#value) {
            this.#error = Validations.Error.Required;
        }
    }

    notRequired() {
        if (!this.#value) {
            this.#error = Validations.Error.None;
        }
    }

    get lastError() {
        return this.#error;
    }
}
