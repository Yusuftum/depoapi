const Warehouse = require('../models/Warehouse');
const Product = require('../models/Product');

// Depo oluşturma
exports.createWarehouse = async (req, res) => {
    try {
        const { name, location } = req.body;
        const newWarehouse = new Warehouse({ name, location });
        await newWarehouse.save();
        res.status(201).json({ message: 'Depo başarıyla oluşturuldu.', warehouse: newWarehouse });
    } catch (error) {
        res.status(500).json({ message: 'Depo oluşturulamadı.', error });
    }
};

// Tüm depoları listeleme
exports.getWarehouses = async (req, res) => {
    try {
        const warehouses = await Warehouse.find();
        res.status(200).json(warehouses);
    } catch (error) {
        res.status(500).json({ message: 'Depolar alınamadı.', error });
    }
};

// Belirli bir depoyu getirme
exports.getWarehouseById = async (req, res) => {
    try {
        const warehouse = await Warehouse.findById(req.params.id);
        if (!warehouse) {
            return res.status(404).json({ message: 'Depo bulunamadı.' });
        }
        res.status(200).json(warehouse);
    } catch (error) {
        res.status(500).json({ message: 'Depo alınamadı.', error });
    }
};

// Ana depoya ürün ekleme
exports.addProductToWarehouse = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const warehouse = await Warehouse.findById(req.params.warehouseId);
        if (!warehouse) {
            return res.status(404).json({ message: 'Depo bulunamadı.' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Ürün bulunamadı.' });
        }

        const existingProductIndex = warehouse.products.findIndex(p => p.productId.toString() === productId);
        if (existingProductIndex > -1) {
            warehouse.products[existingProductIndex].quantity += quantity;
        } else {
            warehouse.products.push({
                productId: product._id,
                name: product.name,
                quantity: quantity,
                price: product.price
            });
        }

        await warehouse.save();
        res.status(200).json({ message: 'Ürün başarıyla depoya eklendi.', warehouse });
    } catch (error) {
        res.status(500).json({ message: 'Ürün depoya eklenemedi.', error });
    }
};
