import deviceService from '../service/device.js';

export default class DeviceController {

    static async getAll(req, res, next) { //GET devices + ?ids='1,2,34,5,623,' etc
        const { ids } = req.query;

        const idsArray = ids 
        ? ids.split(',')
        : null

        try {
            const devices = await deviceService.getDevices(idsArray);
            return (devices.length > 0)
            ? res.status(200).json({ success: true, data : devices})
            : res.status(404).json({ success: false, errorCode: 404, data : {}})
        } catch (error) {
            next(error);
        }
    }

    static async getDataById(req, res, next) { //GET /:id
        const id = req.params.id;
        try {
            const device = await deviceService.getDeviceById(id);
            return (device)
            ? res.status(200).json({ success: true, data : device})
            : res.status(404).json({ success: false, errorCode: 404, data : {}})
        } catch (error) {
            next(error);
        }
    }

    static async addData(req, res, next) { //POST /devices
        try {
            const createdDevice = await deviceService.createDevice(req.body);
            res.status(201).json({ success: true, data: createdDevice });
             // serverSend({ type: 'deviceCreated', id: createdDevice.id });
        } catch (error) {
            next(error);
        }
    }

    static async createOrUpdate(req, res, next) { // PUT /device/:id
        
        const id = req.params.id;
        const idIsReal = await deviceService.exists(id) 

        try{
            const device = idIsReal
            ? await deviceService.updateDevice({ id, data: req.body })
            .then(device => res.status(200).json({ success: true, data:device}))
            : await deviceService.createDevice({ ...req.body})
            .then(device => res.status(201).json({ success: true, data:device }))
            // serverSend({ type: 'deviceUpdated', id: resultDevice.id });
        } catch (error) {
            next(error);
        }
    }

    static async updateData(req, res, next) { // PATCH /device/:id
        const { id } = req.params;
        const idIsReal = await deviceService.exists(id) 

        try{
            const device = idIsReal
            ? await deviceService.updateDevice({ id, data: req.body })
            .then(device => res.status(200).json({ success: true, data:device}))
            : res.status(404).json({ success: false, errorCode: 404, data:{} })
            // serverSend({ type: 'deviceUpdated', id: resultDevice.id });
        } catch (error) {
            next(error);
        }
    }


    static async deleteData(req, res, next) {  // DELETE /device/:id

        const { id } = req.params;
        const idIsReal = await deviceService.exists(id) 

        try{
            const device = idIsReal
            ? await deviceService.deleteDevice(id)
            .then(device => res.status(200).json({ success: true, data:device}))
            : res.status(404).json({ success: false, errorCode: 404, data:{} })
            // serverSend({ type: 'deviceUpdated', id: resultDevice.id });
        } catch (error) {
            next(error);
        }
    }
}