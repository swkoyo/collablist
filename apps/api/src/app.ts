import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { nanoid } from 'nanoid';

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
        genReqId: () => nanoid()
    });

    app.get('/health', (req, res) => {
        res.send({ message: 'hi' });
    });

    return app;
}
