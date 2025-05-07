import { AppError, NotFoundError, DatabaseError } from '../middleware/errors/serviceError.js';

export const BaseService = (Model) => {
    return class {
        constructor() {
            this.Model = Model;
        }

        async safeCall(modelMethodName, ...args) {
            try {
                const result = await this.Model[modelMethodName](...args);
                return result; 
            } catch (error) {
                console.error(`[Service Error] Error en Model.${modelMethodName}(${JSON.stringify(args)}):`, error); // Loguear el error original

                if (error instanceof AppError) {
                    throw error;
                }
                throw new DatabaseError(`Fallo en operación de base de datos: ${modelMethodName}`, error); // Envuelve el error original
            }
        }

        async getAll() {
            const items = await this.safeCall('getAll'); 
            return items; 
        }

        async create(data) {

            const createdResult = await this.safeCall('create', data);

            const createdId = Array.isArray(createdResult) ? createdResult[0] : createdResult;

            return {"id":createdId.toString(), ...data}; 
        }

        async update({ id, data }) {
            const rowsAffected = await this.safeCall('update', { id, data });

            if (!(rowsAffected === 0)) {
                return {id, ...data};
            }
            return null;
        }

        async delete(id) {

            const rowsAffected = await this.safeCall('delete', id);

            if (rowsAffected === 0) {
                 throw new NotFoundError(`El cliente con ID ${id} no encontrado para eliminar.`);
            }

            return { success: true, data:{}};
        }

        async exists(id) {
             const exists = await this.safeCall('exists', id);
             return exists;
        }
    }
}