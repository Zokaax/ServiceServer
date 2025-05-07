import { Router} from 'express';
import FrontController from '../controllers/front.js';

export const frontRouter = Router();

frontRouter.get('/recepciones', FrontController.getReceptions);
frontRouter.get('/reportes', FrontController.getReports);
frontRouter.get('/', FrontController.getIndex);