import { builder } from '../../builder';
import { client } from '../../db';

builder.prismaObject('User', {
    fields: (t) => ({
        id: t.exposeID('id'),
        username: t.exposeString('username'),
        firstName: t.exposeString('firstName', { nullable: true }),
        lastName: t.exposeString('lastName', { nullable: true }),
        avatarUrl: t.exposeString('avatarUrl', { nullable: true }),
        createdAt: t.expose('createdAt', { type: 'Date' }),
        updatedAt: t.expose('updatedAt', { type: 'Date' })
        // tasks: t.relation('tasks', {})
    })
});

builder.queryFields((t) => ({
    getUser: t.prismaField({
        type: 'User',
        args: {
            userId: t.arg.string({ required: true })
        },
        resolve: async (query, _, args) => {
            const user = await client.user.findUnique({
                ...query,
                where: { id: args?.userId }
            });

            if (!user) {
                throw new Error('User not found');
            }

            return user;
        }
    })
}));
