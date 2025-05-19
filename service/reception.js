import {
    BaseService
} from './base.js';
import {
    BaseModel
} from '../model/base.js';
import deviceService from './device.js';
import clientService from './client.js';
import paymentService from './payment.js';

const Reception = BaseModel('receptions');

class ReceptionService extends BaseService(Reception) {
    constructor() {
        super();
    }

    async getReceptions(query = null, like = null) {
        const receptionsRequest = query ?
            await super.getQuery(query, like) :
            await super.getAll();
        return receptionsRequest;
    }

    async getReceptionById(id) {
        const reception = await super.getById(id);
        return reception;
    }

    async getFullReceptions(query = null) {
        const receptionsRequest = query ?
            await super.getQuery(query) :
            await super.getAll();
        const fullReceptions = this.getFullReference(receptionsRequest);
        return fullReceptions
    }

    async getFullReference(receptionsRequest) {
        const fullReceptions = await Promise.all(
            receptionsRequest.map(async (reception) => {

                const client = await clientService.getById(reception.clientId)
                const device = await deviceService.getById(reception.deviceId)
                const payments = await paymentService.getPaymentByReceptions(reception.deviceId)

                const fullReception = {
                    ...reception,
                    client: client || undefined,
                    device: device || undefined,
                    clientId: undefined,
                    deviceId: undefined,
                    payments
                }
                return fullReception
            })
        )
        return fullReceptions
    }

    async createReception(receptionData) {

        const createdReception = await super.create(receptionData);
        const createdId = Array.isArray(createdReception) ? createdReception[0] : createdReception;
        return {
            "id": createdId.toString(),
            ...receptionData
        };
    }

    async updateReception({
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

    async deleteReception(id) {
        const reception = await super.getById(id);
        await super.delete(id);
        return {
            id,
            ...reception
        }
    }
}

const receptionService = new ReceptionService();

export default receptionService;