import {
    BaseService
} from './base.js';
import {
    BaseModel
} from '../model/base.js';
import receptionService from './reception.js';

const Payment = BaseModel('payments');

class PaymentService extends BaseService(Payment) {
    constructor() {
        super();
    }

    async getPayments(query = null, like = null) {

        const paymentsRequest = query ?
            await super.getQuery(query, like) :
            await super.getAll();

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

        const paymentsRequest = await super.getQuery({
            receptionId: receptionId
        });
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
        return {
            "id": createdId.toString(),
            ...paymentData
        };
    }

    async updatePayment({
        id,
        data
    }) {
        await super.update({
            id,
            data
        });
        return {
            id,
            ...data
        }
    }

    async deletePayment(id) {
        const payment = await this.getPaymentById(id);
        await super.delete(id);
        return {
            id,
            ...payment
        }
    }
}

const paymentService = new PaymentService();

export default paymentService;