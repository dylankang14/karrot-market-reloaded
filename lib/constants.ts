export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/);
export const PASSWORD_REGEX_ERROR = "Password must contain a lowercase, a uppercase, a number and special character.";
