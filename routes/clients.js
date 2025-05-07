import { Router } from 'express'
import clientController from '../controllers/client2.js'

export const clientsRouter = Router();

clientsRouter.get('/:id', clientController.getDataById);
clientsRouter.get('/', clientController.getAll);
clientsRouter.post('/', clientController.addData);
clientsRouter.put('/:id', clientController.createOrUpdate);
clientsRouter.patch('/:id', clientController.updateData);
clientsRouter.delete('/:id', clientController.deleteData);
