import { Router } from 'express';
import receptionController from '../controllers/receptionController.js'

export const receptionsRouter = Router();
    
receptionsRouter.get('/:id', receptionController.getDataById);
receptionsRouter.get('/', receptionController.getAll);
receptionsRouter.post('/', receptionController.addData);
