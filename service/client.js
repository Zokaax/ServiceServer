import { AppError, NotFoundError, DatabaseError } from '../middleware/errors/serviceError.js';
import { BaseService } from './base.js';
import { BaseModel } from '../model/base.js'

const Client = BaseModel('clients');

class ClientService extends BaseService(Client) {
    constructor() {
        super();
    }

    async getClients(idsArray = null) {
        if (idsArray && idsArray.length > 0) {
             const clients = await this.safeCall('getByIds', idsArray);
             return clients;
        } else {
             const clients = await super.getAll(); 
             return clients;
        }
    }

    async getClientById(id) {

        const client = await this.safeCall('getById', id);
        if (!client) {
            throw new NotFoundError(`El Cliente con ID ${id} no encontrado.`);
        }
        return client;
    }
    

    async createClient(clientData) {

        //  const existingClient = await this.safeCall('getByEmail', clientData.email); // Asume Model.getByEmail existe
        //  if (existingClient) {
        //       throw new ConflictError(`El cliente con email ${clientData.email} ya existe.`);
        //  }

         const createdClient = await super.create(clientData); // Llama al método create de BaseService
         return createdClient; // Retorna el objeto cliente creado
     }

     async updateClient({ id, data }) {

          const updatedClient = await super.update({ id, data });
          return updatedClient;
     }

     async deleteClient(id) {

        const client = await this.safeCall('getById', id);
        const deleteResult = await super.delete(id);
        if (client) {
            deleteResult.data = client
            deleteResult.data.id = deleteResult.data.id.toString();
        }
        return deleteResult;
     }

    async upsertClient({ id, clientData }) {
        const exists = await super.exists(id);

        let resultClient;
        if (exists) {
            resultClient = await this.updateClient({ id, clientData });
        } else {
            const createDataWithId = { id, ...clientData };
            resultClient = await this.createClient(createDataWithId); 
        }
         return resultClient;
    }
}

const clientService = new ClientService();

export default  clientService;