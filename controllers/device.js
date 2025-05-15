import { DatabaseError, NotFoundError } from '../middleware/errors/serviceError.js';
import deviceService from '../service/device.js';

export default class DeviceController {

    static async getAll(req, res, next) { //GET devices + ?ids='1,2,34,5,623,' etc
        const query = (Object.keys(req.validateQuery).length > 0) 
        ? req.validateQuery
        : null;

        try {
            const devices = await deviceService.getDevices(query);
            (devices.length > 0)
            ? res.status(200).json({success: true, data : devices})
            : next(new NotFoundError(`${req.method} ${req.originalUrl}.`));
        } catch (error) {
            next(new DatabaseError(`${req.method} ${req.originalUrl}.`));
        }
    }

    static async addData(req, res, next) { //POST /devices
        try {
            await deviceService.createDevice(req.validateBody)
            .then(device => res.status(201).json({ success: true, data: device}))
             // serverSend({ type: 'deviceCreated', id: createdDevice.id });
        } catch (error) {
            next(new DatabaseError(`${req.method} ${req.originalUrl}.`));
        }
    }

    static async createOrUpdate(req, res, next) { // PUT /device/:id
        const id = req.validateId;
        const idIsReal = await deviceService.exists(id) 

        try{
            idIsReal
            ? await deviceService.updateDevice({ id, data: req.validateBody })
            .then(device => res.status(200).json({ success: true, data:device}))
            : await deviceService.createDevice({ ...req.body})
            .then(device => res.status(201).json({ success: true, data:device }))
            // serverSend({ type: 'deviceUpdated', id: resultDevice.id });
        } catch (error) {
            next(new DatabaseError(`${req.method} ${req.originalUrl}.`));
        }
    }

    static async updateData(req, res, next) { // PATCH /device/:id
        const id = req.validateId;
        const idIsReal = await deviceService.exists(id) 

        try{
            idIsReal
            ? await deviceService.updateDevice({ id, data: req.validateBody })
            .then(device => res.status(200).json({ success: true, data:device}))
            : next(new NotFoundError(`${req.method} ${req.originalUrl}.`));
            // serverSend({ type: 'deviceUpdated', id: resultDevice.id });
        } catch (error) {
            next(new DatabaseError(`${req.method} ${req.originalUrl}.`));
        }
    }


    static async deleteData(req, res, next) {  // DELETE /device/:id
        const id = req.validateId;
        const idIsReal = await deviceService.exists(id) 

        try{
            idIsReal
            ? await deviceService.deleteDevice(id)
            .then(device => res.status(200).json({ success: true, data:device}))
            : next(new NotFoundError(`${req.method} ${req.originalUrl}.`));
            // serverSend({ type: 'deviceUpdated', id: resultDevice.id });
        } catch (error) {
            next(new DatabaseError(`${req.method} ${req.originalUrl}.`));
        }
    }
}