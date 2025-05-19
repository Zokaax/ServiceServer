import {
    Router
} from 'express';
import clientController from '../controllers/client.js';
import {
    validateRequest,
    validateQuery,
    validateId
} from '../middleware/validation/validateRequest.js';

export const clientsRouter = Router();

clientsRouter.delete('/:id', validateId, clientController.deleteData);

clientsRouter.put('/:id', validateId, validateRequest('client'), clientController.createOrUpdate);
clientsRouter.patch('/:id', validateId, validateRequest('client'), clientController.updateData);

clientsRouter.post('/', validateRequest('client'), clientController.addData);
clientsRouter.get('/', validateId, validateQuery('client'), clientController.getAll);
clientsRouter.get('/like', validateId, validateQuery('client'), clientController.getLike);