import { Router } from 'express';
import deviceController from '../controllers/device.js';
import { validateRequest, validateQuery, validateId} from '../middleware/validation/validateRequest.js';

export const devicesRouter = Router();

devicesRouter.get('/:id', validateId, validateRequest('device'), deviceController.getDataById);
devicesRouter.delete('/:id', validateId, validateRequest('device'), deviceController.deleteData);

devicesRouter.put('/:id', validateId, validateRequest('device'), deviceController.createOrUpdate);
devicesRouter.patch('/:id', validateId, validateRequest('device'), deviceController.updateData);

devicesRouter.post('/', validateRequest('device'), deviceController.addData);
devicesRouter.get('/', validateQuery, deviceController.getAll);