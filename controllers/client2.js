import clientService from '../service/client.js';
import { validateClient, validatePartialClient } from '../middleware/validation/schemas/client.js'; 

export default class ClientController {

    static async getAll(req, res, next) { //GET clients + ?ids='1,2,34,5,623,' etc
        const { ids } = req.query;
        let idsArray = null;

        if (ids) {
             idsArray = ids.split(',').map(id => parseInt(id, 10)).filter(id => !isNaN(id));
             if (idsArray.length === 0 && ids !== '') {
                  return next({ status: 400, message: 'La lista de IDs proporcionada no es válida.' });
             }
        }

        try {
            const clients = await clientService.getClients(idsArray);
            return res.status(200).json({ success: true, data: clients });

        } catch (error) {
            next(error);
        }
    }

    static async getDataById(req, res, next) { //GET /:id
         const id = req.params.id;

        try {
            const client = await clientService.getClientById(id);

            return res.status(200).json({ success: true, data: client });

        } catch (error) {
            next(error);
        }
     }

    static async addData(req, res, next) { //POST /clients

        const validation = validateClient(req.body);
        if (!validation.success) {
              return res.status(400).json({ error: JSON.parse(validation.error.message) });
        }
        const clientData = validation.data;

        try {
            const createdClient = await clientService.createClient(clientData);

            res.status(201).json({ success: true, data: createdClient });

            // serverSend({ type: 'clientCreated', id: createdClient.id });

         } catch (error) {
             next(error);
         }
     }

     static async updateData(req, res, next) { // PATCH /client/:id
         const id = req.params.id;

         const validation = validatePartialClient(req.body);
         if (!validation.success) {
              return res.status(400).json({ error: JSON.parse(validation.error.message) });
         }
         const updateData = validation.data;

         try {

            const client = await clientService.getClientById(id)
                    .catch(err => { 
                        throw err; 
                    });

            const updatedClient = await clientService.updateClient({ id, "data":updateData });
             res.status(200).json({ success: true, data: updatedClient });
            //  serverSend({ type: 'clientUpdated', id: updatedClient.id });

         } catch (error) {
             next(error);
         }
     }

     static async createOrUpdate(req, res, next) { // PUT /client/:id
         const id = req.params.id;

         const validation = validateClient(req.body);
         if (!validation.success) {
              return res.status(400).json({ error: JSON.parse(validation.error.message) });
         }
         const upsertData = validation.data;

         try {
             const client = await clientService.getClientById(id)
                 .catch(err => { 
                     if (err.status === 404) return null;
                     throw err; 
                 });

             let resultClient;
             if (client) {
                 resultClient = await clientService.updateClient({ id, "data":upsertData }); 
                 res.status(200).json({ success: true, data: resultClient });
                //  serverSend({ type: 'clientUpdated', id: resultClient.id });
             } else {
                 resultClient = await clientService.createClient({ ...upsertData }); 
                 res.status(201).json({ success: true, data: resultClient });
                //  serverSend({ type: 'clientCreated', id: resultClient.id });
             }

         } catch (error) {
             next(error);
         }
     }


     static async deleteData(req, res, next) { // DELETE /client/:id
          const id = req.params.id;

          try {
             const deleteResult = await clientService.deleteClient(id);

             res.status(200).json(deleteResult); 

            //  serverSend({ type: 'clientDeleted', id: id });

         } catch (error) {
             next(error);
         }
     }
}