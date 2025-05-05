import { serverSend } from '../config/serverManager.js';
import { BaseController } from './baseController.js'
import { BaseModel } from '../model/baseModel.js'

const Device = BaseModel('devices')

export default class DeviceController extends BaseController(Device) {
    static async addData(req, res, next) {
        try {
            super.addData(req, res, next)
            try {
                serverSend({type: 'devicetAdded'})
            } catch (sendError) {
                console.error('Error al enviar evento "devicetAdded"', sendError)
            }
        } catch (error) {
            next({
                status: 500,
                message: `Error al agregar elemento a ${Device.tableName}`,
                error
            })
        }
    }
}