import { BaseService } from './base.js';
import { BaseModel } from '../model/base.js';

const Client = BaseModel('clients');

class ClientService extends BaseService(Client) {
    constructor() {
        super();
    }

    async getClients(idsArray = null) {
        const clientsRequest = idsArray
        ? await super.getByIds(idsArray)
        : await super.getAll(); 
        return clientsRequest;
    }

    async getClientById(id) {
        const client = await super.getById(id);
        return client;
    }
    
    async createClient(clientData) {
         const createdClient = await super.create(clientData); // return id
         const createdId = Array.isArray(createdClient) ? createdClient[0] : createdClient;
         return {"id":createdId.toString(), ...clientData}; 
     }

     async updateClient({ id, data }) {
        await super.update({ id, data });
        return {id, ...data}
     }

     async deleteClient(id) {
        const client = await super.getById(id);
        await super.delete(id);
        return {id, ...client} 
     }
}

const clientService = new ClientService();

export default  clientService;