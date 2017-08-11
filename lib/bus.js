const EventEmitter = require('events');


const bus = new EventEmitter();
const WEBPACK_BUNDLE_ASSETS = 'WEBPACK_BUNDLE_ASSETS';

module.exports = {
    bus,
    WEBPACK_BUNDLE_ASSETS,
};

