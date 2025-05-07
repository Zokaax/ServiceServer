import { Router } from 'express';
import paymentController from '../controllers/payment.js'

export const paymentsRouter = Router();

paymentsRouter.get('/:id', paymentController.getDataById);
paymentsRouter.get('/', paymentController.getAll);
paymentsRouter.post('/', paymentController.addData);

