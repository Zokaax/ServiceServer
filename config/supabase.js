import {
    createClient
} from '@supabase/supabase-js';
import dotenv from 'dotenv';


if (process.env.NODE_ENV !== 'production') {
    // Cargar variables de entorno
    dotenv.config();
}

export const createConnection = () => {
    return createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY, {
        db: {
            schema: "public",
        },
        auth: {
            persistSession: true,
        },
    });
};