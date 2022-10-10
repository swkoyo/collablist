import z from 'zod';

export const createListSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(5)
});

export type CreateListSchema = z.infer<typeof createListSchema>;
