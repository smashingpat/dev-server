exports.promiseSeries = (promises) => {
    let result = Promise.resolve();
    promises.forEach((promise) => {
        result = result.then(() => promise);
    });

    return result;
};
