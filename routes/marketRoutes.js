const express = require('express');
const router = express.Router();
const { createMarket, getMarkets, getMarketById, requestProductFromSubWarehouse, sellProduct } = require('../controllers/marketController');

// Market rotaları
router.post('/add', createMarket);
router.get('/', getMarkets);
router.get('/:id', getMarketById);
router.post('/:marketId/request-product', requestProductFromSubWarehouse);
router.post('/:marketId/sell-product', sellProduct);

module.exports = router;
