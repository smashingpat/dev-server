const path = require('path');
const MemoryFileSystem = require('memory-fs');
const { createBundler, serverConfig } = require('./webpack');


exports.serverMiddleware = () => {
    const bundler = createBundler(serverConfig);
    const memoryFS = new MemoryFileSystem();
    const serverFilePath = path.join(serverConfig.output.path, serverConfig.output.filename);
    const noopHandler = (req, res, next) => next();

    let serverHandler = noopHandler;

    bundler.outputFileSystem = memoryFS;

    bundler.watch({}, (err, stats) => {
        if (err) throw new Error(err);

        const json = stats.toJson();
        const isUpdated = json.chunks.reduce((bool, chunk) => chunk.rendered || bool, false);

        if (isUpdated) {
            console.log('webpack updated');

            memoryFS.readFile(serverFilePath, 'utf-8', (err, contents) => {
                try {
                    serverHandler = eval(contents).server;
                } catch (err) {
                    console.log(err);
                }
            });
        }
    })

    return (...args) => serverHandler(...args);
};
