import knex from 'knex'

export const database = knex({
    client: 'sqlite3',
    connection: {
        filename: './mydb.sqlite',
    },
});

// Crear la tabla cliente
async function createClientTable() {
    const exists = await database.schema.hasTable('clients');
    if (!exists) {
        await database.schema.createTable('clients', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('phone');
        });
        console.log("Table 'client' added");
    } else {
        console.log("Table 'client' exist");
    }
}

// Crear la tabla dispositivos
async function createDeviceTable() {
    const exists = await database.schema.hasTable('devices');
    if (!exists) {
        await database.schema.createTable('devices', (table) => {
            table.increments('id').primary();
            table.string('brand');
            table.string('type').notNullable();
            table.string('model');
        });
        console.log("Table 'device' added");
    } else {
        console.log("Table 'device' exist");
    }
}

// Crear la tabla medios de pago
async function createPaymentTable() {
    const exists = await database.schema.hasTable('payments');
    if (!exists) {
        await database.schema.createTable('payments', (table) => {
            table.increments('id').primary();
            table.string('method');
            table.string('reference');
            table.string('amoutDolar');
            table.string('amoutBolivar');

            table.string('saintInvoice');
            table.integer('receptionId').unsigned().nullable();

            table.foreign('receptionId').references('id').inTable('receptions').onDelete('CASCADE');

            // table.string('support'); //img
            // table.('date');
        });
        console.log("Table 'payments' added");
    } else {
        console.log("Table 'payments' exist");
    }
}

// Crear la tabla recepcion
async function createReceptionTable() {
    const exists = await database.schema.hasTable('receptions');
    if (!exists) {
        await database.schema.createTable('receptions', (table) => {
            table.increments('id').primary();
            table.string('saintOrder');

            table.date('dateStart');
            table.date('dateEnd');

            table.integer('clientId').unsigned().nullable();
            table.integer('deviceId').unsigned().nullable();

            table.text('clientIssue');
            table.text('workDone');

            table.string('status').defaultTo('EN PROCESO'); //EN PROCESO, PENDIENTE, COBRADO, PAGADO, GARANTIA, CRUCE, ELIMINADA, OTRO

            table.foreign('clientId').references('id').inTable('clients').onDelete('SET NULL');
            table.foreign('deviceId').references('id').inTable('devices').onDelete('SET NULL');

            // Puedes añadir índices para mejorar las búsquedas
            // table.index('cliente_id');
            // table.index('equipo_id');

        });
        console.log("Table 'reception' added");
    } else {
        console.log("Table 'reception' exist");
    }
}

async function createInitialTables() {

    await createClientTable();
    await createDeviceTable();
    await createPaymentTable();
    await createReceptionTable();

}

createInitialTables();