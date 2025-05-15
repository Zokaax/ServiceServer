import { Router } from 'express';
import deviceController from '../controllers/device.js';
import { validateRequest, validateQuery, validateId} from '../middleware/validation/validateRequest.js';

export const devicesRouter = Router();

devicesRouter.delete('/:id', validateId, deviceController.deleteData);

devicesRouter.put('/:id', validateId, validateRequest('device'), deviceController.createOrUpdate);
devicesRouter.patch('/:id', validateId, validateRequest('device'), deviceController.updateData);

devicesRouter.post('/', validateRequest('device'), deviceController.addData);
devicesRouter.get('/', validateId, validateQuery('device'), deviceController.getAll);