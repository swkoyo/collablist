import z from 'zod';
import { PASSWORD_REGEX } from '../../../constants';

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(PASSWORD_REGEX, 'Invalid password')
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const signupSchema = z
    .object({
        email: z.string().email(),
        password: z.string().regex(PASSWORD_REGEX, 'Invalid password'),
        password_confirmation: z.string().regex(PASSWORD_REGEX, 'Invalid password'),
        first_name: z.string().min(2),
        last_name: z.string().min(2)
    })
    .superRefine(({ password_confirmation, password }, ctx) => {
        if (password !== password_confirmation) {
            ctx.addIssue({
                code: 'custom',
                message: 'Passwords do not match',
                path: ['password_confirmation']
            });
        }
    });

export type SignupSchema = z.infer<typeof signupSchema>;
