import { serverSend } from '../config/serverManager.js';
import { BaseController } from './base.js'
import { BaseModel } from '../model/base.js'

const Reception = BaseModel('receptions')

export default class ReceptionController extends BaseController(Reception) {
    static async addData(req, res, next) {
        try {
            super.addData(req, res, next)
            try {
                serverSend({type: 'receptionAdded'})
            } catch (sendError) {
                console.error('Error al enviar evento "receptionAdded"', sendError)
            }
        } catch (error) {
            next({
                status: 500,
                message: `Error al agregar elemento a ${Reception.tableName}`,
                error
            })
        }
    }
}