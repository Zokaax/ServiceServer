import { BaseService } from './base.js';
import { BaseModel } from '../model/base.js';

const Device = BaseModel('devices');

class DeviceService extends BaseService(Device) {
    constructor() {
        super();
    }

    async getDevices(idsArray = null) {
        const devicesRequest = idsArray
        ? await super.getByIds(idsArray)
        : await super.getAll(); 
        return devicesRequest;
    }

    async getDeviceById(id) {
        const device = await super.getById(id);
        return device;
    }
    
    async createDevice(deviceData) {
         const createdDevice = await super.create(deviceData);
         const createdId = Array.isArray(createdDevice) ? createdDevice[0] : createdDevice;
         return {"id":createdId.toString(), ...deviceData}; 
     }

     async updateDevice({ id, data }) {
        await super.update({ id, data });
        return {id, ...data}
     }

     async deleteDevice(id) {
        const device = await super.getById(id);
        await super.delete(id);
        return {id, ...device} 
     }
}

const deviceService = new DeviceService();

export default  deviceService;