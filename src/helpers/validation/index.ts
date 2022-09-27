import { EMAIL_REGEX, PASSWORD_REGEX } from 'src/constants';

export const validateEmail = (email: string) => {
    return EMAIL_REGEX.test(email);
};

export const validatePassword = (password: string) => {
    return PASSWORD_REGEX.test(password);
};

export * from './messages';
