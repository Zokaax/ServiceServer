import {
    DatabaseError,
    NotFoundError
} from '../middleware/errors/serviceError.js';
import receptionService from '../service/reception.js';

export default class ReceptionController {

    static async getAll(req, res, next) { //GET receptions + ?ids='1,2,34,5,623,' etc
        const query = (Object.keys(req.validateQuery).length > 0) ?
            req.validateQuery :
            null;

        try {
            let receptions;
            if (req.path == '/') {
                receptions = await receptionService.getReceptions({
                    query
                });
            } else if (req.path == '/full') {
                receptions = await receptionService.getReceptions({
                    query,
                    full: true
                });
            } else if (req.path == '/like') {
                receptions = await receptionService.getReceptions({
                    query,
                    full: true,
                    like: true
                });
            }
            (receptions && receptions.length > 0) ?
            res.status(200).json({
                success: true,
                data: receptions
            }): next(new NotFoundError(`${req.method} ${req.originalUrl}.`));
        } catch (error) {
            next(new DatabaseError(`${req.method} ${req.originalUrl}.`));
        }
    }

    static async addData(req, res, next) { //POST /receptions
        try {
            await receptionService.createReception(req.validateBody)
                .then(reception => res.status(201).json({
                    success: true,
                    data: reception
                }))
                .catch(error => next(new DatabaseError(`El valor deviceId o clientId no existe en la base de datos, ${req.method} ${req.originalUrl}.`)))
            // serverSend({ type: 'receptionCreated', id: createdReception.id });
        } catch (error) {
            next(new DatabaseError(`${req.method} ${req.originalUrl}.`));
        }
    }

    static async createOrUpdate(req, res, next) { // PUT /reception/:id

        const id = req.params.id;
        const idIsReal = await receptionService.exists(id)

        try {
            idIsReal
                ?
                await receptionService.updateReception({
                    id,
                    data: req.body
                })
                .then(reception => res.status(200).json({
                    success: true,
                    data: reception
                })) :
                await receptionService.createReception({
                    ...req.body
                })
                .then(reception => res.status(201).json({
                    success: true,
                    data: reception
                }))
            // serverSend({ type: 'receptionUpdated', id: resultReception.id });
        } catch (error) {
            next(new DatabaseError(`El valor deviceId o clientId no existe en la base de datos, ${req.method} ${req.originalUrl}.`));
        }
    }

    static async updateData(req, res, next) { // PATCH /reception/:id
        const {
            id
        } = req.params;
        const idIsReal = await receptionService.exists(id)

        try {
            idIsReal
                ?
                await receptionService.updateReception({
                    id,
                    data: req.body
                })
                .then(reception => res.status(200).json({
                    success: true,
                    data: reception
                })) :
                next(new NotFoundError(`${req.method} ${req.originalUrl}.`));
            // serverSend({ type: 'receptionUpdated', id: resultReception.id });
        } catch (error) {
            next(new DatabaseError(`El valor deviceId o clientId no existe en la base de datos, ${req.method} ${req.originalUrl}.`))
        }
    }


    static async deleteData(req, res, next) { // DELETE /reception/:id

        const {
            id
        } = req.params;
        const idIsReal = await receptionService.exists(id)

        try {
            idIsReal
                ?
                await receptionService.deleteReception(id)
                .then(reception => res.status(200).json({
                    success: true,
                    data: reception
                })) :
                next(new NotFoundError(`${req.method} ${req.originalUrl}.`));
            // serverSend({ type: 'receptionUpdated', id: resultReception.id });
        } catch (error) {
            next(new DatabaseError(`${req.method} ${req.originalUrl}.`));
        }
    }
}