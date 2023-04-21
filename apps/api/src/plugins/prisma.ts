import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { client } from '../db';
import type { PrismaClient } from '@collablist/database';

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient;
    }
}

const prismaPlugin: FastifyPluginAsync = fp(async (server, options) => {
    const prisma = client;

    await prisma.$connect();

    server.decorate('prisma', prisma);

    server.addHook('onClose', async (server) => {
        await server.prisma.$disconnect();
    });
});

export default prismaPlugin;
