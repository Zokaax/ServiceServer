import paymentService from '../service/payment.js';

export default class PaymentController {

    static async getAll(req, res, next) { //GET payments + ?ids='1,2,34,5,623,' etc
        const { ids } = req.query;

        const idsArray = ids 
        ? ids.split(',')
        : null

        try {
            const payments = await paymentService.getPayments(idsArray);
            return (payments.length > 0)
            ? res.status(200).json({ success: true, data : payments})
            : res.status(404).json({ success: false, errorCode: 404, data : {}})
        } catch (error) {
            next(error);
        }
    }

    static async getDataById(req, res, next) { //GET /:id
        const id = req.params.id;
        try {
            const payment = await paymentService.getPaymentById(id);
            return (payment)
            ? res.status(200).json({ success: true, data : payment})
            : res.status(404).json({ success: false, errorCode: 404, data : {}})
        } catch (error) {
            next(error);
        }
    }

    static async addData(req, res, next) { //POST /payments
        try {
            const createdPayment = await paymentService.createPayment(req.body);
            res.status(201).json({ success: true, data: createdPayment });
             // serverSend({ type: 'paymentCreated', id: createdPayment.id });
        } catch (error) {
            next(error);
        }
    }

    static async createOrUpdate(req, res, next) { // PUT /payment/:id
        
        const id = req.params.id;
        const idIsReal = await paymentService.exists(id) 

        try{
            const payment = idIsReal
            ? await paymentService.updatePayment({ id, data: req.body })
            .then(payment => res.status(200).json({ success: true, data:payment}))
            : await paymentService.createPayment({ ...req.body})
            .then(payment => res.status(201).json({ success: true, data:payment }))
            // serverSend({ type: 'paymentUpdated', id: resultPayment.id });
        } catch (error) {
            next(error);
        }
    }

    static async updateData(req, res, next) { // PATCH /payment/:id
        const { id } = req.params;
        const idIsReal = await paymentService.exists(id) 

        try{
            const payment = idIsReal
            ? await paymentService.updatePayment({ id, data: req.body })
            .then(payment => res.status(200).json({ success: true, data:payment}))
            : res.status(404).json({ success: false, errorCode: 404, data:{} })
            // serverSend({ type: 'paymentUpdated', id: resultPayment.id });
        } catch (error) {
            next(error);
        }
    }


    static async deleteData(req, res, next) {  // DELETE /payment/:id

        const { id } = req.params;
        const idIsReal = await paymentService.exists(id) 

        try{
            const payment = idIsReal
            ? await paymentService.deletePayment(id)
            .then(payment => res.status(200).json({ success: true, data:payment}))
            : res.status(404).json({ success: false, errorCode: 404, data:{} })
            // serverSend({ type: 'paymentUpdated', id: resultPayment.id });
        } catch (error) {
            next(error);
        }
    }
}