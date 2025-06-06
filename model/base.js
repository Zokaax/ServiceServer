// import {
//     database
// } from '../config/databaseCon.js';
// modelo base para utilizar base de datos knex

import {
    createConnection
} from '../config/supabase.js'

export const BaseModel = (tableName) => {

    return class {

        static db = createConnection();
        static tableName = tableName;

        static async getAll() {
            return await this.db.from(this.tableName).select('*');
        }

        static async getById(id) {
            return this.db.from(this.tableName).where('id', id).first();
        }

        static async getByQuery(querys, like) {
            let queryBuilder = this.db.from(this.tableName).select('*');

            for (const fieldName in querys) {
                if (Object.hasOwnProperty.call(querys, fieldName)) {
                    let value = querys[fieldName];

                    if (typeof value === 'string' && value.includes(',')) {
                        const values = value.split(',');
                        const trimmedValues = values.map(v => v.trim());
                        queryBuilder = queryBuilder.whereIn(fieldName, trimmedValues);
                    } else {

                        if (like) {
                            value = `%${value}%`
                            queryBuilder = queryBuilder.where(fieldName, 'like', value);
                        } else {
                            queryBuilder = queryBuilder.where(fieldName, value);
                        }
                    }
                }
            }

            const elements = await queryBuilder;
            return elements;
        }

        // static async getByDateRange({field, start, end, additionalConditions = {} }) {
        static async getByRange({
            field,
            start,
            end
        }) {
            let queryBuilder = this.db.from(this.tableName).select('*');

            if (start) {
                queryBuilder = queryBuilder.where(field, '>=', start);
            }
            if (end) {
                queryBuilder = queryBuilder.where(field, '<=', end);
            }

            // Add any additional conditions
            // for (const [field, value] of Object.entries(additionalConditions)) {
            //     if (value !== undefined && value !== null) {
            //         queryBuilder = queryBuilder.where(field, value);
            //     }
            // }

            return await queryBuilder;
        }

        static async create(data) {
            return this.db.from(tableName).insert(data);
        }

        static async update({
            id,
            data
        }) {
            return this.db.from(tableName).where('id', id).update(data);
        }

        static async delete(id) {
            return this.db.from(tableName).where('id', id).del();
        }

        static async exists(id) {
            const result = await this.db.from(this.tableName)
                .where('id', id)
                .count('* as count')
                .first();

            const count = result ? result.count : 0;
            return count > 0;
        }
    }
}