const express = require('express');
const router = express.Router();
const { createSubWarehouse, getSubWarehouses, getSubWarehouseById, requestProductFromWarehouse } = require('../controllers/subWarehouseController');

// Alt depo rotaları
router.post('/add', createSubWarehouse);
router.get('/', getSubWarehouses);
router.get('/:id', getSubWarehouseById);
router.post('/:subWarehouseId/request-product', requestProductFromWarehouse); // Bu satırı ekledik

module.exports = router;
