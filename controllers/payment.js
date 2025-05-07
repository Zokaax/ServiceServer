import { serverSend } from '../config/serverManager.js';
import { BaseController } from './base.js'
import { BaseModel } from '../model/base.js'

const Payment = BaseModel('payments')

export default class PaymentController extends BaseController(Payment) {
    static async addData(req, res, next) {
        try {
            super.addData(req, res, next)
            try {
                serverSend({type: 'paymentAdded'})
            } catch (sendError) {
                console.error('Error al enviar evento "paymentAdded"', sendError)
            }
        } catch (error) {
            next({
                status: 500,
                message: `Error al agregar elemento a ${Payment.tableName}`,
                error
            })
        }
    }
}
