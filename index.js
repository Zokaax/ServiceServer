import path from 'node:path';
import {
    join
} from 'node:path';

import {
    app,
    BrowserWindow,
    ipcMain,
    Menu,
    session
} from 'electron';
import {
    fileURLToPath
} from 'node:url';
import {
    dirname
} from 'node:path';
import {
    createServer
} from 'node:http';
import express from 'express';
import cors from 'cors';



//routes
import {
    frontRouter
} from './routes/front.js';
import {
    clientsRouter
} from './routes/clients.js';
import {
    devicesRouter
} from './routes/devices.js';
import {
    receptionsRouter
} from './routes/receptions.js';
import {
    paymentsRouter
} from './routes/payments.js';
import {
    errorHandler
} from './middleware/errors/errorHandler.js'

// Configuración básica
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

const preloadPath = join(__dirname, 'config', 'preload.js');

// Configuración de Express
const expressApp = express();
const httpServer = createServer(expressApp);

// Middleware
expressApp.use(cors());
expressApp.use(express.json());
expressApp.set('view engine', 'ejs');

expressApp.set('views', path.join(__dirname, 'views'));

expressApp.use(express.urlencoded({
    extended: true
}));
expressApp.use(express.static(join(__dirname, 'public')));

expressApp.use((req, res, next) => {
    if (req.headers.access && req.headers.access == process.env.API_ACCES) {
        next()
    } else {
        res.status(401).json({
            success: false,
            msg: 'Not Autorized',
        })
    }
});

// Variables globales
let mainWindow;
let expressServer;
let localStorage;

// Inicialización de la aplicación Electron
function createWindow() {
    try {
        Menu.setApplicationMenu(null);
        mainWindow = new BrowserWindow({
            width: 1200,
            height: 800,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: preloadPath
            }
        });

        // Cargar la aplicación
        if (process.env.NODE_ENV !== 'production') {
            mainWindow.loadURL('http://localhost:3000/', {
                extraHeaders: `access: ${process.env.API_ACCES}`
            });
            mainWindow.webContents.openDevTools();

            // Cargar variables de entorno
            dotenv.config();
        } else {
            // mainWindow.loadFile('public/index.html');
        }

        mainWindow.on('closed', () => {
            //save last changes
            mainWindow = null;
        });
    } catch (error) {
        console.error('Error al crear la ventana:', error);
    }
}

// Iniciar servidor Express
function startExpressServer() {
    const PORT = process.env.PORT || 3000;


    // Rutas API
    expressApp.use('/api/clients', clientsRouter);
    expressApp.use('/api/devices', devicesRouter);
    expressApp.use('/api/receptions', receptionsRouter);
    expressApp.use('/api/payments', paymentsRouter);

    // Front
    expressApp.use('/', frontRouter);

    // errores
    expressApp.use(errorHandler);

    // Iniciar servidor
    expressServer = httpServer.listen(PORT, '127.0.0.1', () => {
        console.log(`Servidor Express en http://localhost:${PORT}`);
    });
}

// Configurar manejadores IPC
function setupIpcHandlers() {
    // Aquí irán los manejadores IPC
    console.log('Manejadores IPC configurados');
}

// Cuando la aplicación esté lista
app.whenReady().then(() => {
    console.log('Aplicación Electron lista');

    try {
        // Iniciar componentes
        setupIpcHandlers();
        startExpressServer();
        createWindow();

        // Manejar reactivación en macOS
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        });
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
    }
});

// Cerrar la aplicación cuando todas las ventanas estén cerradas (excepto en macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }

    if (expressServer) {
        expressServer.close();
    }
});

// Manejo de errores no capturados
process.on('uncaughtException', (error) => {
    console.error('Error no capturado:', error);
});