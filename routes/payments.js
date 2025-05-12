import { Router } from 'express';
import paymentController from '../controllers/payment.js';
import { validateRequest, validateQuery, validateId} from '../middleware/validation/validateRequest.js';

export const paymentsRouter = Router();

paymentsRouter.get('/:id', validateId, validateRequest('payment'), paymentController.getDataById);
paymentsRouter.delete('/:id', validateId, validateRequest('payment'), paymentController.deleteData);

paymentsRouter.put('/:id', validateId, validateRequest('payment'), paymentController.createOrUpdate);
paymentsRouter.patch('/:id', validateId, validateRequest('payment'), paymentController.updateData);

paymentsRouter.post('/', validateRequest('payment'), paymentController.addData);
paymentsRouter.get('/', validateQuery, paymentController.getAll);