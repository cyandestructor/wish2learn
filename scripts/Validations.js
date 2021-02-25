export default class Validations
{
    #value;
    #error = 0;

    constructor(value)
    {
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
        Required: 9
    }

    alphabetic(spaces = false)
    {
        let exp = spaces ? /^[a-zA-Z\s]+$/ : /^[a-zA-Z]+$/;

        if(!this.#value.match(exp))
        {
            this.#error = Validations.Error.Alphabetic;
        }

        return this;
    }

    numeric(spaces = false)
    {
        let exp = spaces ? /^[\d\s]+$/ : /^\d+$/;

        if(!this.#value.match(exp))
        {
            this.#error = Validations.Error.Numeric;
        }

        return this;
    }

    alphanumeric(spaces = false)
    {
        let exp = spaces ? /^[a-zA-Z\d\s]+$/ : /^[a-zA-Z\d]+$/;

        if(!this.#value.match(exp))
        {
            this.#error = Validations.Error.Alphanumeric;
        }

        return this;
    }

    match(exp)
    {
        if(!this.#value.match(exp))
        {
            this.#error = Validations.Error.Match;
        }

        return this;
    }

    minValue(value)
    {
        if(this.#value < value)
        {
            this.#error = Validations.Error.MinValue;
        }
    }

    maxValue(value)
    {
        if(this.#value > value)
        {
            this.#error = Validations.Error.MaxValue;
        }
    }

    minLength(length)
    {
        if(this.#value.length < length)
        {
            this.#error = Validations.Error.MinLength;
        }
    }

    maxLength(length)
    {
        if(this.#value.length > length)
        {
            this.#error = Validations.Error.MaxLength;
        }
    }

    required()
    {
        if(!this.#value)
        {
            this.#error = Validations.Error.Required;
        }
    }

    notRequired()
    {
        if(!this.#value)
        {
            this.#error = Validations.Error.None;
        }
    }

    get lastError()
    {
        return this.#error;
    }
}