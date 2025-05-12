import clientService from '../service/client.js';

export default class ClientController {

    static async getAll(req, res, next) { //GET clients + ?ids='1,2,34,5,623,' etc
        const { ids } = req.query;

        const idsArray = ids 
        ? ids.split(',')
        : null

        try {
            const clients = await clientService.getClients(idsArray);
            return (clients.length > 0)
            ? res.status(200).json({ success: true, data : clients})
            : res.status(404).json({ success: false, errorCode: 404, data : {}})
        } catch (error) {
            next(error);
        }
    }

    static async getDataById(req, res, next) { //GET /:id
        const id = req.params.id;
        try {
            const client = await clientService.getClientById(id);
            return (client)
            ? res.status(200).json({ success: true, data : client})
            : res.status(404).json({ success: false, errorCode: 404, data : {}})
        } catch (error) {
            next(error);
        }
    }

    static async addData(req, res, next) { //POST /clients
        try {
            const createdClient = await clientService.createClient(req.body);
            res.status(201).json({ success: true, data: createdClient });
             // serverSend({ type: 'clientCreated', id: createdClient.id });
        } catch (error) {
            next(error);
        }
    }

    static async createOrUpdate(req, res, next) { // PUT /client/:id
        
        const id = req.params.id;
        const idIsReal = await clientService.exists(id) 

        try{
            const client = idIsReal
            ? await clientService.updateClient({ id, data: req.body })
            .then(client => res.status(200).json({ success: true, data:client}))
            : await clientService.createClient({ ...req.body})
            .then(client => res.status(201).json({ success: true, data:client }))
            // serverSend({ type: 'clientUpdated', id: resultClient.id });
        } catch (error) {
            next(error);
        }
    }

    static async updateData(req, res, next) { // PATCH /client/:id
        const { id } = req.params;
        const idIsReal = await clientService.exists(id) 

        try{
            const client = idIsReal
            ? await clientService.updateClient({ id, data: req.body })
            .then(client => res.status(200).json({ success: true, data:client}))
            : res.status(404).json({ success: false, errorCode: 404, data:{} })
            // serverSend({ type: 'clientUpdated', id: resultClient.id });
        } catch (error) {
            next(error);
        }
    }


    static async deleteData(req, res, next) {  // DELETE /client/:id

        const { id } = req.params;
        const idIsReal = await clientService.exists(id) 

        try{
            const client = idIsReal
            ? await clientService.deleteClient(id)
            .then(client => res.status(200).json({ success: true, data:client}))
            : res.status(404).json({ success: false, errorCode: 404, data:{} })
            // serverSend({ type: 'clientUpdated', id: resultClient.id });
        } catch (error) {
            next(error);
        }
    }
}
