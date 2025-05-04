const path = require('path');

module.exports = {
    server: {
        port: process.env.PORT || 3000,
        environment: process.env.NODE_ENV || 'development'
    },
    database: {
        client: 'sqlite3',
        connection: {
            filename: path.join(__dirname, '../mydb.sqlite')
        }
    },
    api: {
        prefix: '/api',
        version: 'v1'
    },
    log: {
        level: process.env.LOG_LEVEL || 'debug',
        format: 'combined'
    }
};