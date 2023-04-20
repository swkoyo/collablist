import z from 'zod';

export const editUserSchema = z.object({
    username: z.string().min(3).optional(),
    first_name: z.string().min(3).optional(),
    last_name: z.string().min(3).optional(),
    avatar_url: z.string().url().optional()
});

export type EditUserSchema = z.infer<typeof editUserSchema>;
