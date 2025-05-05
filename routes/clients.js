import { Router } from 'express'
import clientController from '../controllers/clientController.js'

export const clientsRouter = Router();

clientsRouter.get('/:id', clientController.getDataById);
clientsRouter.get('/', clientController.getAll);
clientsRouter.post('/', clientController.addData);
