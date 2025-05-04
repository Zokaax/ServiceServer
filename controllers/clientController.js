const { serverSend }  = require('../config/serverManager.mjs');

const BaseController = require('./baseController')
const BaseModel = require('../model/baseModel');
const path = require('path');

const Client = BaseModel('clients');

class ClientController extends BaseController(Client){

    static async addData(req, res, next) {
        
        try {
            super.addData(req, res, next)
            try {
                serverSend({type:'clientAdded'});
            } catch (sendError) {
                console.error('Error al enviar evento "clientAdded"', sendError);
            }
        } catch (error) {
            next({
                status: 500,
                message: `Error al agregar elemento a ${Client.tableName}`,
                error
            });
        }
    }
}

module.exports = ClientController;