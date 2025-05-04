const express = require('express');
const router = express.Router();

const receptionController  = require ('../controllers/receptionController');
const clientController  = require ('../controllers/clientController');
const deviceController  = require ('../controllers/deviceController');
const paymentController  = require ('../controllers/paymentController');


// router.get('/receptions', routesController.getReceptions);

// Clientes
router.get('/client', clientController.getDataByIds);
router.get('/client/:id', clientController.getDataById);
router.get('/clients', clientController.getAll);
router.post('/client', clientController.addData);

// Dispositivos
router.get('/device', deviceController.getDataByIds);
router.get('/device/:id', deviceController.getDataById);
router.get('/devices', deviceController.getAll);
router.post('/device', deviceController.addData);

// Recepciones
router.get('/reception', receptionController.getDataByIds);
router.get('/reception/:id', receptionController.getDataById);
router.get('/receptions', receptionController.getAll);
router.post('/reception', receptionController.addData);

// Pagos
router.get('/payment', paymentController.getDataByIds);
router.get('/payment/:id', paymentController.getDataById);
router.get('/payments', paymentController.getAll);
router.post('/payment', paymentController.addData);

module.exports = router;
