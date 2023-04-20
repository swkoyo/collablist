import { PASSWORD_REGEX as FULL_PASSWORD_REGEX } from '@collablist/shared/constants';

export const API_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:3000/v1';

export const PASSWORD_REGEX = {
    FULL: FULL_PASSWORD_REGEX,
    VALID_CHARACTERS: /^[A-Za-z\d!@#$%^&*]+$/,
    LENGTH: /^[A-Za-z\d!@#$%^&*]{8,20}$/,
    LOWERCASE: /[a-z]/,
    UPPERCASE: /[A-Z]/,
    DIGIT: /[\d]/,
    SPECIAL_CHARACTER: /[!@#$%^&*]/
};
