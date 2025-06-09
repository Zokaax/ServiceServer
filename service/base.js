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

        async getQuery(query, like = false) {
            const items = await this.safeCall('getByQuery', query, like);
            return items;
        }

        async getRange(field, start, end) {
            const items = await this.safeCall('getByRange', {
                field,
                start,
                end
            });
            return items;
        }

        async create(data) { //retorna el id creado
            const idCreated = await this.safeCall('create', data);
            return idCreated;
        }

        async update({
            id,
            data
        }) { //retorna la cantidad de filas afectadas
            const rowsAffected = await this.safeCall('update', {
                id,
                item: data
            });
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