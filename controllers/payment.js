import { DatabaseError, NotFoundError } from '../middleware/errors/serviceError.js';
import paymentService from '../service/payment.js';

export default class PaymentController {

    static async getAll(req, res, next) { //GET payments + ?ids='1,2,34,5,623,' etc
        const query = (Object.keys(req.validateQuery).length > 0) 
        ? req.validateQuery
        : null;

        try {
            const payments = await paymentService.getPayments(query);
            (payments.length > 0)
            ? res.status(200).json({ success: true, data : payments})
            : next(new NotFoundError(`${req.method} ${req.originalUrl}.`));
        } catch (error) {
            next(new DatabaseError(`${req.method} ${req.originalUrl}.`));
        }
    }

    static async addData(req, res, next) { //POST /payments
        try {
            await paymentService.createPayment(req.validateBody)
            .then(payment => res.status(201).json({ success: true, data: payment}))
            .catch(error => next(new DatabaseError(`El valor receptionId no existe en la base de datos, ${req.method} ${req.originalUrl}.`)))
             // serverSend({ type: 'paymentCreated', id: createdPayment.id });
        } catch (error) {
            next(new DatabaseError(`${req.method} ${req.originalUrl}.`));
        }
    }

    static async createOrUpdate(req, res, next) { // PUT /payment/:id
        const id = req.validateId;
        const idIsReal = await paymentService.exists(id) 

        try{
            idIsReal
            ? await paymentService.updatePayment({ id, data: req.validateBody })
            .then(payment => res.status(200).json({ success: true, data:payment}))
            .catch(error => next(new DatabaseError(`El valor receptionId no existe en la base de datos, ${req.method} ${req.originalUrl}.`)))
            : await paymentService.createPayment({ ...req.body})
            .then(payment => res.status(201).json({ success: true, data:payment }))
            .catch(error => next(new DatabaseError(`El valor receptionId no existe en la base de datos, ${req.method} ${req.originalUrl}.`)))
            // serverSend({ type: 'paymentUpdated', id: resultPayment.id });
        } catch (error) {
            next(new DatabaseError(`Ha ocurrido un error en la conexion de la base de datos.${req.method} ${req.originalUrl}.`));
        }
    }

    static async updateData(req, res, next) { // PATCH /payment/:id
        const id = req.validateId;
        const idIsReal = await paymentService.exists(id) 

        console.log(req.validateBody)

        try{
            idIsReal
            ? await paymentService.updatePayment({ id, data: req.validateBody })
            .then(payment => res.status(200).json({ success: true, data:payment}))
            .catch(error => next(new DatabaseError(`El valor receptionId no existe en la base de datos, ${req.method} ${req.originalUrl}.`)))
            : next(new NotFoundError(`${req.method} ${req.originalUrl}.`));
            // serverSend({ type: 'paymentUpdated', id: resultPayment.id });
        } catch (error) {
            next(new DatabaseError(`${req.method} ${req.originalUrl}.`));
        }
    }


    static async deleteData(req, res, next) {  // DELETE /payment/:id
        const id = req.validateId;
        const idIsReal = await paymentService.exists(id) 

        try{
            idIsReal
            ? await paymentService.deletePayment(id)
            .then(payment => res.status(200).json({ success: true, data:payment}))
            : next(new NotFoundError(`${req.method} ${req.originalUrl}.`));
            // serverSend({ type: 'paymentUpdated', id: resultPayment.id });
        } catch (error) {
            next(new DatabaseError(`${req.method} ${req.originalUrl}.`));
        }
    }
}