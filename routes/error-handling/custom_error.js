class CustomUnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CustomUnauthorizedError';
        this.statusCode = 401;
    }
}

class CustomInternalServerError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CustomInternalServerError';
        this.statusCode = 500;
    }
}

class CustomNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CustomNotFoundError';
        this.statusCode = 404;
    }
}

module.exports = {
    CustomUnauthorizedError,
    CustomInternalServerError,
    CustomNotFoundError
}