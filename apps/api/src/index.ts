import fastify, { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
    fastify({
        logger: {
            transport: {
                target: 'pino-pretty',
                options: {
                    translateTime: 'HH:MM:ss Z',
                    ignore: 'pid,hostname'
                }
            }
        }
    });

server.get('/health', async (req, res) => {
    res.send({ message: 'ddddd' });
});

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listing at ${address}`);
});

process.on('SIGTERM', async () => {
    server.close();
});
