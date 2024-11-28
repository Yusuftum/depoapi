const Market = require('../models/Market');
const SubWarehouse = require('../models/SubWarehouse');
const Product = require('../models/Product');

// Market oluşturma
exports.createMarket = async (req, res) => {
    try {
        const { name, location, subWarehouse } = req.body;
        const newMarket = new Market({ name, location, subWarehouse });
        await newMarket.save();

        const subWarehouseRecord = await SubWarehouse.findById(subWarehouse);
        subWarehouseRecord.markets.push(newMarket._id);
        await subWarehouseRecord.save();

        res.status(201).json({ message: 'Market başarıyla oluşturuldu.', market: newMarket });
    } catch (error) {
        res.status(500).json({ message: 'Market oluşturulamadı.', error });
    }
};

// Tüm marketleri listeleme
exports.getMarkets = async (req, res) => {
    try {
        const markets = await Market.find();
        res.status(200).json(markets);
    } catch (error) {
        res.status(500).json({ message: 'Marketler alınamadı.', error });
    }
};

// Belirli bir marketi getirme
exports.getMarketById = async (req, res) => {
    try {
        const market = await Market.findById(req.params.id);
        if (!market) {
            return res.status(404).json({ message: 'Market bulunamadı.' });
        }
        res.status(200).json(market);
    } catch (error) {
        res.status(500).json({ message: 'Market alınamadı.', error });
    }
};

// Marketin alt depodan ürün talep etmesi
exports.requestProductFromSubWarehouse = async (req, res) => {
    try {
        const { subWarehouseId, productId, quantity } = req.body;
        const subWarehouse = await SubWarehouse.findById(subWarehouseId);
        if (!subWarehouse) {
            return res.status(404).json({ message: 'Alt depo bulunamadı.' });
        }

        const market = await Market.findById(req.params.marketId);
        if (!market) {
            return res.status(404).json({ message: 'Market bulunamadı.' });
        }

        const productInSubWarehouse = subWarehouse.products.find(p => p.productId.toString() === productId);
        if (!productInSubWarehouse || productInSubWarehouse.quantity < quantity) {
            return res.status(400).json({ message: 'Yeterli ürün stokta yok.' });
        }

        productInSubWarehouse.quantity -= quantity;
        const productInMarket = market.products.find(p => p.productId.toString() === productId);

        if (productInMarket) {
            productInMarket.quantity += quantity;
        } else {
            market.products.push({
                productId: productId,
                quantity: quantity
            });
        }

        await subWarehouse.save();
        await market.save();

        res.status(200).json({
            message: 'Ürün talebi başarıyla karşılandı.',
            remainingQuantityInSubWarehouse: productInSubWarehouse.quantity,
            addedQuantityInMarket: quantity,
            totalQuantityInMarket: market.products.find(p => p.productId.toString() === productId).quantity
        });
    } catch (error) {
        res.status(500).json({ message: 'Ürün talebi karşılanamadı.', error });
    }
};

// Marketten ürün satışı
exports.sellProduct = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const market = await Market.findById(req.params.marketId);
        if (!market) {
            return res.status(404).json({ message: 'Market bulunamadı.' });
        }

        const productInMarket = market.products.find(p => p.productId.toString() === productId);
        if (!productInMarket || productInMarket.quantity < quantity) {
            return res.status(400).json({ message: 'Yeterli ürün stokta yok.' });
        }

        // Ürün fiyatını Product modelinden al
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Ürün bulunamadı.' });
        }

        productInMarket.quantity -= quantity;

        // Satış detaylarını kaydetme
        const sale = {
            productId: productId,
            quantity: quantity,
            price: product.price,
            total: product.price * quantity
        };
        market.sales.push(sale);

        await market.save();

        res.status(200).json({
            message: 'Ürün satışı başarıyla gerçekleştirildi.',
            remainingQuantityInMarket: productInMarket.quantity,
            sale
        });
    } catch (error) {
        res.status(500).json({ message: 'Ürün satışı gerçekleştirilemedi.', error });
    }
};
