import {
    Router
} from 'express';
import receptionController from '../controllers/reception.js';
import {
    validateRequest,
    validateQuery,
    validateId
} from '../middleware/validation/validateRequest.js';

export const receptionsRouter = Router();

receptionsRouter.post('/', validateRequest('reception'), receptionController.addData);
receptionsRouter.get('/', validateId, validateQuery('reception'), receptionController.getAll);
receptionsRouter.get('/full', validateId, validateQuery('reception'), receptionController.getFullAll);
// receptionsRouter.get('/like', validateId, validateQuery('reception'), receptionController.getLike);

receptionsRouter.delete('/:id', validateId, receptionController.deleteData);

receptionsRouter.put('/:id', validateId, validateRequest('reception'), receptionController.createOrUpdate);
receptionsRouter.patch('/:id', validateId, validateRequest('reception'), receptionController.updateData);