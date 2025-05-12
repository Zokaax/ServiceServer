import { Router } from 'express';
import receptionController from '../controllers/reception.js';
import { validateRequest, validateQuery, validateId} from '../middleware/validation/validateRequest.js';

export const receptionsRouter = Router();

receptionsRouter.post('/', validateRequest('reception'), receptionController.addData);
receptionsRouter.get('/', validateQuery, receptionController.getAll);
receptionsRouter.get('/full', validateQuery, receptionController.getFullAll);

receptionsRouter.get('/:id', validateId, validateRequest('reception'), receptionController.getDataById);
receptionsRouter.delete('/:id', validateId, validateRequest('reception'), receptionController.deleteData);

receptionsRouter.put('/:id', validateId, validateRequest('reception'), receptionController.createOrUpdate);
receptionsRouter.patch('/:id', validateId, validateRequest('reception'), receptionController.updateData);

receptionsRouter.get('/full/:id', validateId, validateRequest('reception'), receptionController.getFullDataById);
