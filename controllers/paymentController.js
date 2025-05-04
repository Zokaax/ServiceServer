const { serverSend }  = require('../config/serverManager.mjs');

const BaseController = require('./baseController')
const BaseModel = require('../model/baseModel')
const path = require('path')

const Payment = BaseModel('payments')

class PaymentController extends BaseController(Payment) {
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

module.exports = PaymentController