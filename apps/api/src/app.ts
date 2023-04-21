import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { nanoid } from 'nanoid';
import { appRouter } from './services/trpc';
import { createContext } from './context';

export function buildApp(logging = true) {
    const app = fastify({
        logger: logging && {
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true
                }
            },
            level: 'debug'
        },
        genReqId: () => nanoid(),
        maxParamLength: 5000
    });

    app.register(fastifyTRPCPlugin, {
        prefix: '/trpc',
        trpcOptions: { router: appRouter, createContext }
    });

    app.get('/health', (req, res) => {
        res.send({ message: 'hi' });
    });

    return app;
}
