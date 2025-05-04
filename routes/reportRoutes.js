const express = require('express');
const router = express.Router();
const routesController = require ('../controllers/frontController')

router.get('/reportes', routesController.getReports)

module.exports = router;