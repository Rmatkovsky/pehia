class errorHandler {
    static unauthorized(res) {
        return res.status(401)
            .json({ errors: 'Unauthorized' });
    }

    static badRequest(res) {
        return res.status(400)
            .json({ errors: 'Bad Request' });
    }

    static methodNotAllowed(res) {
        return res.status(405)
            .json({ errors: 'Method Not Allowed' });
    }

    static conflict(res, message) {
        return res.status(405)
            .json({ errors: message });
    }

    static notFound(res, message) {
        return res.status(405)
            .json({ errors: message });
    }

    static unprocessableEntity(res, errors) {
        return res.status(422)
            .json({ errors });
    }
}

export default errorHandler;
