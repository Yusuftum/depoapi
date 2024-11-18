const express = require('express');
const router = express.Router();
const { createProduct, getProducts, getProductById } = require('../controllers/productController');

// Ürün rotaları
router.post('/add', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);

module.exports = router;
