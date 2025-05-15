import { Router } from 'express';
import paymentController from '../controllers/payment.js';
import { validateRequest, validateQuery, validateId} from '../middleware/validation/validateRequest.js';

export const paymentsRouter = Router();

paymentsRouter.delete('/:id', validateId, paymentController.deleteData);

paymentsRouter.put('/:id', validateId, validateRequest('payment'), paymentController.createOrUpdate);
paymentsRouter.patch('/:id', validateId, validateRequest('payment'), paymentController.updateData);

paymentsRouter.post('/', validateRequest('payment'), paymentController.addData);
paymentsRouter.get('/', validateId, validateQuery('payment'), paymentController.getAll);