import { serverSend } from '../config/serverManager.js';
import { BaseController } from './baseController.js'
import { BaseModel } from '../model/baseModel.js'

const Client = BaseModel('clients');

export default class ClientController extends BaseController(Client){
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