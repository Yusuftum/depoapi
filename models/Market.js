const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true }
}, { timestamps: true });

const marketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    subWarehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'SubWarehouse', required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number
        }
    ],
    sales: [saleSchema] 
}, { timestamps: true });

module.exports = mongoose.model('Market', marketSchema);
