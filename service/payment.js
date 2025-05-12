import { BaseService } from './base.js';
import { BaseModel } from '../model/base.js';

const Payment = BaseModel('payments');

class PaymentService extends BaseService(Payment) {
    constructor() {
        super();
    }

    async getPayments(idsArray = null) {

        const paymentsRequest = idsArray
        ? await super.getByIds(idsArray)
        : await super.getAll(); 

        const paymentsWithOutReceptions = paymentsRequest.map(payment => {
            return {
                ...payment,
                receptionId: undefined
                };
            })
        return paymentsWithOutReceptions;
    }

    async getPaymentById(id) {
        const payment = await super.getById(id);
        return {
            ...payment,
            receptionId: undefined
        };
    };

    async getPaymentByReceptions(receptionId) {

        const paymentsRequest = await super.getField('receptionId', receptionId);
        const paymentsWithOutReceptions = paymentsRequest.map(payment => {
            return {
                ...payment,
                receptionId: undefined
                };
            })
        return paymentsWithOutReceptions;
    }

    async createPayment(paymentData) {
         const createdPayment = await super.create(paymentData);
         const createdId = Array.isArray(createdPayment) ? createdPayment[0] : createdPayment;
         return {"id":createdId.toString(), ...paymentData}; 
     }

     async updatePayment({ id, data }) {
        await super.update({ id, data });
        return {id, ...data}
     }

     async deletePayment(id) {
        const payment = await super.getById(id);
        await super.delete(id);
        return {id, ...payment} 
     }
}

const paymentService = new PaymentService();

export default paymentService;
