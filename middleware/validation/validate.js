const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.validate(req.body);
            next();
        } catch (error) {
            next({
                status: 400,
                message: 'Validación fallida',
                details: error.details
            });
        }
    };
};

module.exports = validate;