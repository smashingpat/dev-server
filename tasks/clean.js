const rimraf = require('rimraf');
const config = require('./config');


module.exports = () => new Promise((resolve, reject) => {
    rimraf(config.folders.assets, (err) => {
        if (err) reject(err);

        resolve(`${config.folders.assets} removed`);
    });
});
