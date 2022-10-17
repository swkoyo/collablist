import z from 'zod';

export const createListSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(5),
    items: z.array(z.object({ title: z.string().min(3) })).min(1),
    members: z.array(z.number().int().positive()).optional()
});

export type CreateListSchema = z.infer<typeof createListSchema>;
