import express, { json } from 'express';
// import config from './index.ts';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path'

// const { addClient, removeClient } = require('./config/serverManager.js');
import { addClient, removeClient } from './config/serverManager.js'

//routes
import { frontRouter } from './routes/front.js';
import { clientsRouter } from './routes/clients.js';
import { devicesRouter } from './routes/devices.js';
import { receptionsRouter } from './routes/receptions.js';
import { paymentsRouter } from './routes/payments.js';
import { errorHandler } from './middleware/errors/errorHandler.js'

const app = express();

app.set('view engine', 'ejs');
//vistas

// const logger = require('./middleware/logging/logger');
// const errorHandler = require('./middleware/errors/errorHandler');

const port = process.env.port ?? 3000;
// const environment = process.env.environment ?? 'development';

// app.use(logger);
app.use(json());

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

// ruta estática
app.use(express.static(join(__dirname, 'public')));



// app.get('/events', (req, res) => {
//     addClient(res);

//     // Manejar la desconexión del cliente
//     req.on('close', () => {
//         removeClient(res);
//     });
// });


// const reportsRouter = require('./routes/reportRoutes');
// const equiposRouter = require('./routes/equiposRouter');
// const propietarioRouter = require('./routes/propietarioRouter');

// Rutas API
app.use('/api/clients', clientsRouter);
app.use('/api/devices', devicesRouter);
app.use('/api/receptions', receptionsRouter);
app.use('/api/payments', paymentsRouter);

// Front
app.use('/', frontRouter);

// errores
app.use(errorHandler);

app.listen(port, () => {
        console.log("Servidor escuchando en http://localhost:" + port);
        // console.log(`Entorno: ${environment}`);
});
