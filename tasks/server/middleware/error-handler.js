module.exports = (err, req, res, done) => {
    const errorDetails = {
        message: err.message,
        status: err.status,
        stack: err.stack,
        stackHighlighted: typeof err.stack === 'string'
            ? err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
            : null,
    };

    res.statusCode = errorDetails.status || 500;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<pre>${errorDetails.stackHighlighted}</pre>`);
};
