const express = require('express');
const router = express.Router();
const { createWarehouse, getWarehouses, getWarehouseById, addProductToWarehouse } = require('../controllers/warehouseController');

// Depo rotaları
router.post('/add', createWarehouse);
router.get('/', getWarehouses);
router.get('/:id', getWarehouseById);
router.post('/:warehouseId/add-product', addProductToWarehouse);

module.exports = router;
