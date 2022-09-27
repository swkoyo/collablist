export const ROLE = {
    ADMIN: 'ADMIN',
    USER: 'USER'
};

export const PASSWORD_REGEX =
    /^(?=.*[A-Za-z])(?=.*(\d|[!@#$%^&*]))[A-Za-z\d!@#$%^&*]{8,20}$/;
export const EMAIL_REGEX = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
