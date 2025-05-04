const express = require('express');
const router = express.Router();
const frontController = require('../controllers/frontController');


// Navegación
router.get('/recepciones', frontController.getReceptions);
router.get('/reportes', frontController.getReports);
router.get('/', frontController.getIndex);

module.exports = router;