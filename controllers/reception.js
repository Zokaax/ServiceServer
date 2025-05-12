import receptionService from '../service/reception.js';

export default class ReceptionController {

    static async getAll(req, res, next) { //GET receptions + ?ids='1,2,34,5,623,' etc
        const { ids } = req.query;

        const idsArray = ids 
        ? ids.split(',')
        : null

        try {
            const receptions = await receptionService.getReceptions(idsArray);
            return (receptions.length > 0)
            ? res.status(200).json({ success: true, data : receptions})
            : res.status(404).json({ success: false, errorCode: 404, data : {}})
        } catch (error) {
            next(error);
        }
    }

    static async getDataById(req, res, next) { //GET /:id
        const id = req.params.id;
        try {
            const reception = await receptionService.getReceptionById(id);
            return (reception)
            ? res.status(200).json({ success: true, data : reception})
            : res.status(404).json({ success: false, errorCode: 404, data : {}})
        } catch (error) {
            next(error);
        }
    }

    static async getFullAll(req, res, next) { //GET receptions + ?ids='1,2,34,5,623,' etc
        const { ids } = req.query;

        const idsArray = ids 
        ? ids.split(',')
        : null

        try {
            const receptions = await receptionService.getFullReceptions(idsArray);
            return (receptions.length > 0)
            ? res.status(200).json({ success: true, data : receptions})
            : res.status(404).json({ success: false, errorCode: 404, data : {}})
        } catch (error) {
            next(error);
        }
    }

    static async getFullDataById(req, res, next) { //GET /:id
        const id = req.params.id;
        try {
            const reception = await receptionService.getFullReceptionById(id);
            return (reception)
            ? res.status(200).json({ success: true, data : reception})
            : res.status(404).json({ success: false, errorCode: 404, data : {}})
        } catch (error) {
            next(error);
        }
    }

    static async addData(req, res, next) { //POST /receptions
        try {
            const createdReception = await receptionService.createReception(req.body);
            res.status(201).json({ success: true, data: createdReception });
             // serverSend({ type: 'receptionCreated', id: createdReception.id });
        } catch (error) {
            next(error);
        }
    }

    static async createOrUpdate(req, res, next) { // PUT /reception/:id
        
        const id = req.params.id;
        const idIsReal = await receptionService.exists(id) 

        try{
            const reception = idIsReal
            ? await receptionService.updateReception({ id, data: req.body })
            .then(reception => res.status(200).json({ success: true, data:reception}))
            : await receptionService.createReception({ ...req.body})
            .then(reception => res.status(201).json({ success: true, data:reception }))
            // serverSend({ type: 'receptionUpdated', id: resultReception.id });
        } catch (error) {
            next(error);
        }
    }

    static async updateData(req, res, next) { // PATCH /reception/:id
        const { id } = req.params;
        const idIsReal = await receptionService.exists(id) 

        try{
            const reception = idIsReal
            ? await receptionService.updateReception({ id, data: req.body })
            .then(reception => res.status(200).json({ success: true, data:reception}))
            : res.status(404).json({ success: false, errorCode: 404, data:{} })
            // serverSend({ type: 'receptionUpdated', id: resultReception.id });
        } catch (error) {
            next(error);
        }
    }


    static async deleteData(req, res, next) {  // DELETE /reception/:id

        const { id } = req.params;
        const idIsReal = await receptionService.exists(id) 

        try{
            const reception = idIsReal
            ? await receptionService.deleteReception(id)
            .then(reception => res.status(200).json({ success: true, data:reception}))
            : res.status(404).json({ success: false, errorCode: 404, data:{} })
            // serverSend({ type: 'receptionUpdated', id: resultReception.id });
        } catch (error) {
            next(error);
        }
    }
}