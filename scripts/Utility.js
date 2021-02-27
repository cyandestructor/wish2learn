export default class Utility
{
    static formDataToObject(formData, multiFields = null)
    {
        // Based on:
        // https://www.learnwithjason.dev/blog/get-form-values-as-json

        let object = Object.fromEntries(formData.entries());
        
        // If the data has multi-select values
        if (multiFields && Array.isArray(multiFields)) {
            multiFields.forEach(field => {
                object[field] = formData.getAll(field);
            });
        }

        return object;
    }
}