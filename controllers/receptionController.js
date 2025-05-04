const { serverSend }  = require('../config/serverManager.mjs');

const BaseController = require('./baseController')
const BaseModel = require('../model/baseModel')
const path = require('path')

const Reception = BaseModel('receptions')

class ReceptionController extends BaseController(Reception) {
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

module.exports = ReceptionController