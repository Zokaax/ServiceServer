    
    const express = require('express');
    const app = express();
    const config = require('./index.ts')
    const path = require('path');
    const {addClient, removeClient} = require('./config/serverManager.mjs')
    
    // const logger = require('./middleware/logging/logger');
    // const errorHandler = require('./middleware/errors/errorHandler');
    
    const port = config.server.port;
    const environment = config.server.environment;
    
    // app.use(logger);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    //ruta estatica
    app.use(express.static(path.join(__dirname, 'public')));
    
    
    app.get('/events', (req, res) => {
        addClient(res);

        // Manejar la desconexión del cliente
        req.on('close', () => {
            removeClient(res);
        });
    });

    const frontRouter = require('./routes/frontRoutes.js');
    const dataRouter = require('./routes/dataRoutes.js');
    // const reportsRouter = require('./routes/reportRoutes');
    // const equiposRouter = require('./routes/equiposRouter');
    // const propietarioRouter = require('./routes/propietarioRouter');

    // Rutas API
    app.use('/api/', dataRouter);
    // app.use('/api/reports', reportsRouter);

    // Front
    app.use('/', frontRouter);

    // errores
    // app.use(errorHandler);

    app.listen(port, () => {
        console.log("Servidor escuchando en http://localhost: " + port);
        console.log(`Entorno: ${environment}`);
    });
