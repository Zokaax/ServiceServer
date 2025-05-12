export const BaseService = (Model) => {
    return class {
        constructor() {
            this.Model = Model;
        }

        async safeCall(modelMethodName, ...args) {
            const result = await this.Model[modelMethodName](...args);
            return result; 
        }

        async getAll() {
            const items = await this.safeCall('getAll'); 
            return items; 
        }

        async getById(id) {
            const items = await this.safeCall('getById', id); 
            return items; 
        }

        async getByIds(idsArray) {
            const items = await this.safeCall('getByIds', idsArray); 
            return items; 
        }

        async getField(field, value) {
            const items = await this.safeCall('getByField', field, value); 
            return items; 
        }

        async create(data) { //retorna el id creado
            const idCreated = await this.safeCall('create', data);
            return idCreated;
        }

        async update({ id, data }) { //retorna la cantidad de filas afectadas
            const rowsAffected = await this.safeCall('update', { id, data });
            return rowsAffected;
        }

        async delete(id) { //retorna la cantidad de filas afectadas
            const rowsAffected = await this.safeCall('delete', id);
            return rowsAffected;
        }

        async exists(id) {
             const exists = await this.safeCall('exists', id);
             return exists;
        }
    }
}