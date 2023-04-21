import { buildApp } from './app';

const app = buildApp(true);

process.on('SIGTERM', async () => {
    app.close();
});

app.listen({
    port: 3000
})
    .then((serverUrl) => {
        app.log.info(`API located at ${serverUrl}`);
    })
    .catch((err) => {
        app.log.error(err);
        process.exit(1);
    });
