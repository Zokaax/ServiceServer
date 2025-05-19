import {
    DatabaseError,
    NotFoundError
} from '../middleware/errors/serviceError.js';
import clientService from '../service/client.js';

export default class ClientController {

    static async getAll(req, res, next) { //GET clients + ?ids='1,2,34,5,623,' etc
        const query = (req.validateQuery && (Object.keys(req.validateQuery).length > 0)) ?
            req.validateQuery :
            null;

        try {
            const clients = await clientService.getClients(query);
            (clients.length > 0) ?
            res.status(200).json({
                success: true,
                data: clients
            }): next(new NotFoundError(`${req.method} ${req.originalUrl}.`));
        } catch (error) {
            next(new DatabaseError(`${req.method} ${req.originalUrl}.`));
        }
    }

    static async getLike(req, res, next) { //GET clients + ?ids='1,2,34,5,623,' etc
        const query = (req.validateQuery && (Object.keys(req.validateQuery).length > 0)) ?
            req.validateQuery :
            null;

        try {
            const clients = await clientService.getClients(query, true);
            (clients.length > 0) ?
            res.status(200).json({
                success: true,
                data: clients
            }): next(new NotFoundError(`${req.method} ${req.originalUrl}.`));
        } catch (error) {
            next(new DatabaseError(`${req.method} ${req.originalUrl}.`));
        }
    }


    static async addData(req, res, next) { //POST /clients
        try {
            await clientService.createClient(req.validateBody)
                .then(client => res.status(201).json({
                    success: true,
                    data: client
                }))
            // serverSend({ type: 'clientCreated', id: createdClient.id });
        } catch (error) {
            next(new DatabaseError(`${req.method} ${req.originalUrl}.`));
        }
    }

    static async createOrUpdate(req, res, next) { // PUT /client/:id
        const id = req.validateId;
        const idIsReal = await clientService.exists(id)

        try {
            idIsReal
                ?
                await clientService.updateClient({
                    id,
                    data: req.validateBody
                })
                .then(client => res.status(200).json({
                    success: true,
                    data: client
                })) :
                await clientService.createClient({
                    ...req.validateBody
                })
                .then(client => res.status(201).json({
                    success: true,
                    data: client
                }))
            // serverSend({ type: 'clientUpdated', id: resultClient.id });
        } catch (error) {
            next(new DatabaseError(`${req.method} ${req.originalUrl}.`));
        }
    }

    static async updateData(req, res, next) { // PATCH /client/:id
        const id = req.validateId;
        const idIsReal = await clientService.exists(id);

        try {
            idIsReal
                ?
                await clientService.updateClient({
                    id,
                    data: req.validateBody
                })
                .then(client => res.status(200).json({
                    success: true,
                    data: client
                })) :
                next(new NotFoundError(`${req.method} ${req.originalUrl}.`))
            // serverSend({ type: 'client', id: resultClient.id });
        } catch (error) {
            next(new DatabaseError(`${req.method} ${req.originalUrl}.`));
        }
    }

    static async deleteData(req, res, next) { // DELETE /client/:id
        const id = req.validateId;
        const idIsReal = await clientService.exists(id)

        try {
            idIsReal
                ?
                await clientService.deleteClient(id)
                .then(client => res.status(200).json({
                    success: true,
                    data: client
                })) :
                next(new NotFoundError(`${req.method} ${req.originalUrl}.`))
            // serverSend({ type: 'clientUpdated', id: resultClient.id });
        } catch (error) {
            next(new DatabaseError(`${req.method} ${req.originalUrl}.`));
        }
    }
}