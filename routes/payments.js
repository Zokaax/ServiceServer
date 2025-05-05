import { Router } from 'express';
import paymentController from '../controllers/paymentController.js'

export const paymentsRouter = Router();

paymentsRouter.get('/:id', paymentController.getDataById);
paymentsRouter.get('/', paymentController.getAll);
paymentsRouter.post('/', paymentController.addData);

