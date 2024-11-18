const mongoose = require('mongoose');

const subWarehouseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    parentWarehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number
        }
    ],
    markets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Market' }]
}, { timestamps: true });

module.exports = mongoose.model('SubWarehouse', subWarehouseSchema);
