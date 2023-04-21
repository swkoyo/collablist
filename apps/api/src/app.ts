import { createYoga } from 'graphql-yoga';
import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { schema } from 'schema';

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
        }
    });

    const graphQLServer = createYoga<{
        req: FastifyRequest;
        reply: FastifyReply;
    }>({
        schema,
        logging: {
            debug: (...args) => args.forEach((arg) => app.log.debug(arg)),
            info: (...args) => args.forEach((arg) => app.log.info(arg)),
            warn: (...args) => args.forEach((arg) => app.log.warn(arg)),
            error: (...args) => args.forEach((arg) => app.log.error(arg))
        }
    });

    app.addContentTypeParser('multipart/form-data', {}, (req, payload, done) =>
        done(null)
    );

    app.route({
        url: '/graphql',
        method: ['GET', 'POST', 'OPTIONS'],
        handler: async (req, reply) => {
            const response = await graphQLServer.handleNodeRequest(req, {
                req,
                reply
            });
            for (const [name, value] of response.headers) {
                reply.header(name, value);
            }

            reply.status(response.status);

            reply.send(response.body);

            return reply;
        }
    });

    return app;
}
