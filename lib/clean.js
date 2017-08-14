const rimraf = require('rimraf');
const { config } = require('./config');


const clean = () => new Promise((resolve, reject) => {
    rimraf(config.assetsFolder, (err) => {
        if (err) reject(err);

        resolve();
    });
});

module.exports = clean;
