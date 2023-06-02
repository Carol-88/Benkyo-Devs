const generateError = (message, status) => {
    const error = new Error(message);
    error.httpStatus = 400;
    throw error;
}

module.exports = {
    generateError,
}