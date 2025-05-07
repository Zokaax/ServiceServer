import { serverSend } from '../config/serverManager.js';
import { BaseController } from './base.js'
import { BaseModel } from '../model/base.js'
import { validateClient } from '../middleware/validation/schemas/client.js'

const Client = BaseModel('clients');

export default class ClientController extends BaseController(Client){
    static async addData(req, res, next) {
        const validation = validateClient(req.body)

        if (!validation.success){
            return res.status(400).json({ error: JSON.parse(validation.error.message) })
        }
        req.body = validation.data

        super.addData(req, res, next);
        // serverSend({type:'clientAdded'});

    }


    static async updateData(req, res, next) {
        const validation = validateClient(req.body)

        if (!validation.success){
            return res.status(400).json({ error: JSON.parse(validation.error.message) })
        }
        req.body = validation.data
        super.updateData(req, res, next);
        // serverSend({type:'clientAdded'});

    }
}

