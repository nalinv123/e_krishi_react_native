import { validationDictionary } from "./validationDictonary";
import validate from "validate.js";

export function validateField(fieldName, value) {
    var formValues = {};
    formValues[fieldName] = value;

    var formFields = {};
    formFields[fieldName] = validationDictionary[fieldName]

    const result = validate(formValues, formFields);

    if (result) {
        return result[fieldName][0];
    }

    return null;
}

// class ValidationService {
//     validateField(fieldName, value) {
//         var formValues = {};
//         formValues[fieldName] = value;
    
//         var formFields = {};
//         formFields[fieldName] = validationDictionary[fieldName]
    
//         const result = validate(formValues, formFields);
    
//         if (result) {
//             return result[fieldName][0];
//         }
    
//         return null;
//     }
// }

// export default ValidationService;