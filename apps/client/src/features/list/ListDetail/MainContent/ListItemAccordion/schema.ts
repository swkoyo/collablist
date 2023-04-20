import z from 'zod';

export const createListItemSchema = z.object({
    title: z.string().min(3)
});

export type CreateListItemSchema = z.infer<typeof createListItemSchema>;

export const editListItemSchema = createListItemSchema;

export type EditListItemSchema = CreateListItemSchema;

export const editListSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(5)
});

export type EditListSchema = z.infer<typeof editListSchema>;
