const Product = require('../models/Product');

// Ürün oluşturma
exports.createProduct = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        const newProduct = new Product({ name, price, quantity });
        await newProduct.save();
        res.status(201).json({ message: 'Ürün başarıyla oluşturuldu.', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Ürün oluşturulamadı.', error });
    }
};

// Tüm ürünleri listeleme
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Ürünler alınamadı.', error });
    }
};

// Belirli bir ürünü getirme
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Ürün bulunamadı.' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Ürün alınamadı.', error });
    }
};
