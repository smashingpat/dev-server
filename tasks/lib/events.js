const EventEmitter = require('events');


class MyEvents extends EventEmitter {
    emit(eventName, ...args) {
        console.log(eventName);
        super.emit(eventName, ...args);
    }
}

const events = new MyEvents();

// exports
exports.events = events;
exports.WEBPACK_BUNDLE_ASSETS_DONE = 'WEBPACK_BUNDLE_ASSETS_DONE';
exports.WEBPACK_BUNDLE_ASSETS_PENDING = 'WEBPACK_BUNDLE_ASSETS_PENDING';
exports.WEBPACK_BUNDLE_SERVER_DONE = 'WEBPACK_BUNDLE_SERVER_DONE';
exports.WEBPACK_BUNDLE_SERVER_PENDING = 'WEBPACK_BUNDLE_SERVER_PENDING';
