import {
    createConnection
} from '../config/supabase.js'

export const BaseModel = (tableName) => {
    const supabase = createConnection();

    return class {
        static tableName = tableName;

        static async getAll() {
            const {
                data,
                error
            } = await supabase
                .from(this.tableName)
                .select('*');

            if (error) throw error;
            return data;
        }

        static async getById(id) {
            const {
                data,
                error
            } = await supabase
                .from(this.tableName)
                .select('*')
                .eq('id', id)
                .single();

            if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
            return data;
        }

        static async getByQuery(querys, like = false) {
            let query = supabase
                .from(this.tableName)
                .select('*');

            for (const fieldName in querys) {
                if (Object.hasOwnProperty.call(querys, fieldName)) {
                    let value = querys[fieldName];

                    if (typeof value === 'string' && value.includes(',')) {
                        const values = value.split(',').map(v => v.trim());
                        query = query.in(fieldName, values);
                    } else {
                        if (like) {
                            value = `%${value}%`;
                            query = query.ilike(fieldName, value);
                        } else {
                            query = query.eq(fieldName, value);
                        }
                    }
                }
            }


            const {
                data,
                error
            } = await query;
            if (error) throw error;
            return data || [];
        }

        static async getByRange({
            field,
            start,
            end
        }) {
            let query = supabase
                .from(this.tableName)
                .select('*');

            if (start) {
                query = query.gte(field, start);
            }
            if (end) {
                query = query.lte(field, end);
            }

            const {
                data,
                error
            } = await query;
            if (error) throw error;
            return data;
        }

        static async create(data) {
            const {
                data: result,
                error
            } = await supabase
                .from(this.tableName)
                .insert(data)
                .select();

            if (error) throw error;
            return result ? result : [0] || null;
        }

        static async update({
            id,
            data
        }) {
            const {
                data: result,
                error
            } = await supabase
                .from(this.tableName)
                .update(data)
                .eq('id', id)
                .select();

            if (error) throw error;
            return result ? result : [0] || null;
        }

        static async delete(id) {
            const {
                data,
                error
            } = await supabase
                .from(this.tableName)
                .delete()
                .eq('id', id);

            if (error) throw error;
            return data;
        }

        static async exists(id) {
            const {
                data,
                error
            } = await supabase
                .from(this.tableName)
                .select('id', {
                    count: 'exact',
                    head: true
                })
                .eq('id', id);

            if (error) throw error;
            return data && data.length > 0;
        }
    };
};