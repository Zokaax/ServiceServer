import { database } from '../config/databaseCon.js';
// modelo base para utilizar base de datos knex

export const BaseModel = (tableName) => {

    return class {
        
        static db = database;
        static tableName = tableName;

        static async getAll() {
            return this.db(tableName).select('*');
        }

        static async getById(id) {
            return this.db(tableName).where('id', id).first();
        }

        static async getByIds(array) {
            const elements = await this.db(tableName).whereIn('id', array).select('*');
            return elements
        }

        static async getByField(fieldName, value) {
            const elements = await this.db(this.tableName).where(fieldName, value).select('*');
            return elements
        }
        
        static async create(data) {
            return this.db(tableName).insert(data);
        }

        static async update({ id, data }) {
            return this.db(tableName).where('id', id).update(data);
        }

        static async delete(id) {
            return this.db(tableName).where('id', id).del();
        }

        static async exists(id) {
            const result = await this.db(this.tableName)
                .where('id', id)
                .count('* as count') 
                .first(); 
        
            const count = result ? result.count : 0;
            return count > 0;
        }
    }
}