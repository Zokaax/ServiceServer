import { Router } from 'express';
import deviceController from '../controllers/deviceController.js'

export const devicesRouter = Router();

devicesRouter.get('/:id', deviceController.getDataById);
devicesRouter.get('/', deviceController.getAll);
devicesRouter.post('/', deviceController.addData);
