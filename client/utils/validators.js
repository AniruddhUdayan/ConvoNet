/**
 * Custom username validator compatible with the useInputValidation hook.
 * Validates usernames based on the following criteria:
 * - Must be between 3 to 15 characters in length.
 * - Can only contain alphanumeric characters and underscores.
 *
 * @param {string} username The username to validate.
 * @return {{isValid: boolean, errorMessage: string}} Validation result.
 */
export const usernameValidator = (username) => {
    // Define the validation criteria
    const isValidLength = username.length >= 3 && username.length <= 15;
    const isValidContent = /^[a-zA-Z0-9_]+$/.test(username);

    // Check if username meets the criteria
    if (!isValidLength || !isValidContent) {
        return {
            isValid: false,
            errorMessage: "Username must be 3-15 characters and can only contain letters, numbers, and underscores.",
        };
    }

    // If all checks pass
    return {
        isValid: true,
        errorMessage: "", // No error message if valid
    };
};
