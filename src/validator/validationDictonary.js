export const validationDictionary = {
    email: {
        presence: {
            allowEmpty: false,
            message: "^This is required"
        },
        email: {
            message: "^Email address must be valid"
        }
    },
    password: {
        presence: {
            allowEmpty: false,
            message: "^This is required"
        },
        length: {
            minimum: 6,
            maximum: 20
        }
    },
    name: {
        presence: {
            allowEmpty: false,
            message: "^This is required"
        }
    },
    city: {
        presence: {
            allowEmpty: false,
            message: "^This is required"
        }
    },
    mobile: {
        presence: {
            allowEmpty: false,
            message: "^This is required"
        },
        length: {
            minimum: 10,
            maximum: 10
        },
        format: {
            pattern: "\\d{10}"
        }
    },
    price: {
        presence: {
            allowEmpty: false,
            message: "^This is required"
        }
    }
}