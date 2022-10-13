import z from 'zod';

export const createListItemSchema = z.object({
    title: z.string().min(3)
});

export type CreateListItemSchema = z.infer<typeof createListItemSchema>;

export const editListItemSchema = createListItemSchema;

export type EditListItemSchema = CreateListItemSchema;
