const { serverSend }  = require('../config/serverManager.mjs');

const BaseController = require('./baseController')
const BaseModel = require('../model/baseModel')
const path = require('path')

const Device = BaseModel('devices')

class DeviceController extends BaseController(Device) {
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

module.exports = DeviceController