import {
    ValidationError,
    InvalidQueryError
} from '../errors/serviceError.js'
import {
    validateClient,
    validatePartialClient
} from './schemas/client.js';
import {
    validateDevice,
    validatePartialDevice
} from './schemas/device.js';
import {
    validatePayment,
    validatePartialPayment
} from './schemas/payment.js';
import {
    validateReception,
    validatePartialReception
} from './schemas/reception.js';
import {
    validateRawId
} from './schemas/id.js';
import {
    validateRawQuerys
} from './schemas/query.js';

const validationSchemas = {
    client: {
        create: validateClient,
        update: validatePartialClient
    },
    device: {
        create: validateDevice,
        update: validatePartialDevice
    },
    payment: {
        create: validatePayment,
        update: validatePartialPayment
    },
    reception: {
        create: validateReception,
        update: validatePartialReception
    }
};

export const validateRequest = (resource) => {
    return (req, res, next) => {
        const method = req.method.toLowerCase();
        let validation;

        if (['put', 'post'].includes(method)) {
            validation = validationSchemas[resource].create(req.body);
        } else if (method === 'patch') {
            validation = validationSchemas[resource].update(req.body);
        } else {
            return next();
        }
        if (!validation.success) {
            return next(new ValidationError(`${validation.error.issues[0].message} en la ruta ${req.method} ${req.originalUrl}.`));
        }
        req.validateBody = validation.data;
        next();
    };
};

export const validateQuery = (resource) => {
    return (req, res, next) => {
        const query = req.query;

        let validation = validationSchemas[resource].update(query);

        if (!validation.success) {
            return next(new ValidationError(`${validation.error.issues[0].message} en la ruta ${req.method} ${req.originalUrl}.`));
        }

        const data = {
            ...validation.data
        }

        if (req.validateId) {
            data.id = req.validateId;
        }
        req.validateQuery = data
        next();
    };
};

export function validateId(req, res, next) {

    let id = req.params.id ?
        req.params.id :
        req.query.id || null

    const validation = validateRawId({
        id
    });
    if (!validation.success) {
        return next(new InvalidQueryError(`${validation.error.issues[0].message} en la ruta ${req.method} ${req.originalUrl}.`));
    }
    req.validateId = validation.data.id ?
        validation.data.id.toString() :
        undefined
    next();

}