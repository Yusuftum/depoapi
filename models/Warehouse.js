const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            name: String,
            quantity: Number,
            price: Number
        }
    ],
    subWarehouses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubWarehouse' }]
}, { timestamps: true });

module.exports = mongoose.model('Warehouse', warehouseSchema);
